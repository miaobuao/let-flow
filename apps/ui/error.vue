<template>
  <NuxtLayout>
    <n-result
      class="hfull flex flex-col justify-center"
      :status="pageData.status"
      :title="pageData.title"
      :description="pageData.description"
    >
      <template v-if="!errorStatus.includes(pageData.status)" #icon>
        <i class="n-base-icon">🧬</i>
      </template>

      <template #footer>
        <n-button @click="handleError">
          {{ $t('error.handle') }}
        </n-button>
      </template>
    </n-result>
  </NuxtLayout>
</template>

<script setup lang="ts">
export interface ErrorPage {
  url: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  description: string;
  data: any;
}

export type ErrorStatus = (typeof errorStatus)[number];

const errorStatus = [
  '500',
  'error',
  'info',
  'success',
  'warning',
  '404',
  '403',
  '418',
] as const;

export interface ResultPage {
  status: ErrorStatus;
  title: string;
  description: string;
  handle: string;
}
const props = defineProps<{
  error: ErrorPage;
}>();

const { t } = useI18n();

const pageData = computed<Omit<ResultPage, 'status'> & { status: any }>(() => {
  const code = props.error.statusCode.toString();
  return {
    status: code,
    title: t(`result.${code}.title`),
    description: t(`result.${code}.description`),
    handle: t(`result.${code}.handle`),
  };
});
const handleError = () => clearError({ redirect: '/' });
</script>
