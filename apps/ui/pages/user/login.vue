<template>
  <div class="hfull flex flex-col justify-center">
    <n-card class="w-[90%] max-w-[400px] my-0 mx-auto">
      <n-tabs
        default-value="signin"
        size="large"
        justify-content="space-evenly"
      >
        <n-tab-pane name="signin" :tab="$t('common.login')">
          <n-form
            ref="loginFormRef"
            :model="loginFormValue"
            :rules="loginFormRules"
          >
            <n-form-item-row :label="$t('common.email')" path="email">
              <n-input v-model:value="loginFormValue.email" />
            </n-form-item-row>
            <n-form-item-row :label="$t('common.password')" path="password">
              <n-input
                v-model:value="loginFormValue.password"
                type="password"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="onLogin">
            {{ $t('common.login') }}
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" :tab="$t('common.register')">
          <n-form
            ref="registerFormRef"
            :model="registerFormValue"
            :rules="registerFormRules"
          >
            <n-form-item-row :label="$t('common.username')" path="name">
              <n-input v-model:value="registerFormValue.name" />
            </n-form-item-row>
            <n-form-item-row :label="$t('common.email')" path="email">
              <n-input v-model:value="registerFormValue.email" />
            </n-form-item-row>
            <n-form-item-row :label="$t('common.password')" path="password">
              <n-input
                v-model:value="registerFormValue.password"
                type="password"
              />
            </n-form-item-row>
            <n-form-item-row
              :label="$t('login.form.retype_password')"
              path="password2"
            >
              <n-input
                v-model:value="registerFormValue.password2"
                type="password"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="onRegister">
            {{ $t('common.register') }}
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInst, FormItemRule } from 'naive-ui';

import axios from 'axios';

const { t } = useI18n();
const loginFormRef = ref<FormInst>();
const loginFormValue = ref({
  email: '',
  password: '',
});
const loginFormRules = {
  email: {
    required: true,
    trigger: ['blur'],
  },
  password: {
    required: true,
    trigger: ['blur'],
  },
};
function onLogin() {}

const registerFormRef = ref<FormInst>();
const registerFormValue = ref({
  ...loginFormValue.value,
  name: '',
  password2: '',
});
const registerFormRules = {
  ...loginFormRules,
  password2: {
    required: true,
    trigger: ['input', 'blur'],
    validator(rule: FormItemRule, value: string) {
      if (value !== registerFormValue.value.password) {
        return new Error(t('login.form.retype_password_error'));
      }
      return true;
    },
  },
  name: {
    required: true,
    trigger: ['blur'],
  },
};

function onRegister() {
  registerFormRef.value?.validate((errors) => {
    if (!errors) {
      axios
        .post('/api/v1/user', registerFormValue.value)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
</script>
