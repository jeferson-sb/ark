<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps
  extends NumberInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputInputProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.input v-bind="numberInput.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
