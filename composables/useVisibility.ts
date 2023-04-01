import { onMounted, onUnmounted, ref } from 'vue';

export const useVisibility = () => {
  const isVisible = ref(false);

  const checkVisibility = (el: any) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      isVisible.value = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  };

  const handleScroll = () => {
    checkVisibility(element.value);
  };

  const element = ref(null);

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    checkVisibility(element.value);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { element, isVisible };
};
