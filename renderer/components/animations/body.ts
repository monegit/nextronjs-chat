import { AnimationControls } from "framer-motion";

export function onHide(animate: AnimationControls) {
  return animate
    .start({
      opacity: 0,
      transition: { duration: 0.2 },
    })
    .then(() => {
      animate.set({ display: "none" });
    });
}
export function onVisible(animate: AnimationControls) {
  animate.set({ opacity: 0 });
  animate.start({
    opacity: 1,
    transition: { duration: 0.2 },
  });
}
