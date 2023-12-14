<template>
  <n-layout position="absolute">
    <n-layout-header
      class="header flex flex-col hfull justify-center px-[4px]"
      bordered
    >
      <n-space justify="space-between">
        <n-button>1</n-button>
        <n-dropdown trigger="hover" :options="options" show-arrow>
          <n-button :bordered="false" circle>
            <n-icon size="20">
              <settings-outline />
            </n-icon>
          </n-button>
        </n-dropdown>
      </n-space>
    </n-layout-header>
    <n-layout class="content" position="absolute" has-sider>
      <n-layout-sider bordered :native-scrollbar="false"> </n-layout-sider>
      <n-layout :native-scrollbar="false"> </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';

import { SettingsOutline } from '@vicons/ionicons5';

const options: DropdownOption[] = [];
</script>

<style lang="sass" scoped>
$HEADER_HEIGHT: 42px
$FOOTER_HEIGHT: 0px

.header
  height: $HEADER_HEIGHT

.content
  top: $HEADER_HEIGHT
  bottom: $FOOTER_HEIGHT
</style>
