<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps {}
export interface TagsInputHiddenInputProps
  extends TagsInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputHiddenInputProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.input v-bind="tagsInput.getHiddenInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
