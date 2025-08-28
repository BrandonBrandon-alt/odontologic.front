import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook personalizado para detectar la dirección del scroll
 * y controlar la visibilidad del navbar siguiendo el patrón profesional:
 * - Ocultar al hacer scroll hacia abajo
 * - Mostrar inmediatamente al hacer scroll hacia arriba
 * - Siempre visible en la parte superior
 */
/**
 * Mejorado para evitar que el navbar se oculte inmediatamente tras cambiar de página.
 * - Acepta dependencyKey (ej: pathname) para resetear estado en navegación.
 * - Umbral de desplazamiento antes de ocultar (hideDeltaThreshold).
 * - No oculta hasta que se supera topOffset y deltaDown > hideDeltaThreshold.
 */
const useScrollDirection = (
  dependencyKey,
  {
    topOffset = 100,
    hideDeltaThreshold = 12,
    showOnRouteChangeDelay = 500,
    // Nueva distancia mínima acumulada de desplazamiento hacia abajo tras un cambio de ruta
    minAccumulatedScrollToHide = 140,
  } = {}
) => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const routeChangeTimeoutRef = useRef(null);
  const initializedRef = useRef(false);
  const userInteractedRef = useRef(false);
  const accumulatedDownRef = useRef(0); // cuánto se ha desplazado hacia abajo desde el último reset

  const handleScroll = useCallback(() => {
    currentScrollY.current = window.scrollY;
    const y = currentScrollY.current;
    const prev = prevScrollY.current;
    const delta = y - prev;

    // Siempre visible en la parte superior
    if (y < topOffset) {
      if (!isVisible) setIsVisible(true);
      setScrollDirection("up");
      prevScrollY.current = y;
      return;
    }

    // Evitar reacción en el primer evento tras mount/navegación
    if (!initializedRef.current) {
      initializedRef.current = true;
      prevScrollY.current = y;
      return;
    }

    // Scroll hacia abajo: sólo ocultar si delta supera umbral puntual Y la distancia acumulada también
    if (
      delta > hideDeltaThreshold &&
      userInteractedRef.current &&
      accumulatedDownRef.current >= minAccumulatedScrollToHide
    ) {
      if (isVisible) setIsVisible(false);
      setScrollDirection("down");
      prevScrollY.current = y;
      return;
    }

    // Acumular desplazamiento hacia abajo (sólo suma cuando delta positivo)
    if (delta > 0) {
      accumulatedDownRef.current += delta;
    }

    // Scroll hacia arriba: mostrar si delta negativo significativo
    if (delta < -hideDeltaThreshold) {
      if (!isVisible) setIsVisible(true);
      setScrollDirection("up");
      prevScrollY.current = y;
      return;
    }
  }, [hideDeltaThreshold, isVisible, topOffset]);

  // Listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Detectar interacción explícita del usuario (rueda, toque, teclas de scroll)
  useEffect(() => {
    const markInteracted = () => {
      userInteractedRef.current = true;
    };
    const keyHandler = (e) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Space",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        userInteractedRef.current = true;
      }
    };
    window.addEventListener("wheel", markInteracted, { passive: true });
    window.addEventListener("touchstart", markInteracted, { passive: true });
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("wheel", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  // Reset cuando cambia la ruta (dependencyKey)
  useEffect(() => {
    if (dependencyKey === undefined) return; // no-op si no se pasa
    // Forzar visible y reiniciar referencias
    setIsVisible(true);
    setScrollDirection("up");
    initializedRef.current = false;
    userInteractedRef.current = false; // reiniciar interacción al cambiar de ruta
    accumulatedDownRef.current = 0; // reset acumulado
    prevScrollY.current = window.scrollY;
    // Pequeña ventana en la que se ignoran ocultamientos
    if (routeChangeTimeoutRef.current)
      clearTimeout(routeChangeTimeoutRef.current);
    routeChangeTimeoutRef.current = setTimeout(() => {
      initializedRef.current = true;
    }, showOnRouteChangeDelay);
    return () =>
      routeChangeTimeoutRef.current &&
      clearTimeout(routeChangeTimeoutRef.current);
  }, [dependencyKey, showOnRouteChangeDelay]);

  return { scrollDirection, isVisible };
};

export default useScrollDirection;
