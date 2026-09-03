import { onMounted, ref } from "vue"

// gates an entrance animation on document.fonts.ready so it never animates
// through a late font swap, but never blocks forever either - whichever of
// the font promise or the 400ms timeout resolves first wins. Used by both
// the home hero and case-study pages, hence the generic name - it is not
// specific to any one entrance.
export function useEntranceReady() {
  const ready = ref(false)

  onMounted(() => {
    if (typeof document === "undefined" || !document.fonts) {
      ready.value = true
      return
    }

    let settled = false
    const settle = () => {
      if (settled) return
      settled = true
      ready.value = true
    }

    const timeout = setTimeout(settle, 400)
    document.fonts.ready.then(() => {
      clearTimeout(timeout)
      settle()
    })
  })

  return { ready }
}
