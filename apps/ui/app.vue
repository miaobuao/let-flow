<template>
  <NuxtLayout>
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <NuxtPage />
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </NuxtLayout>
</template>
