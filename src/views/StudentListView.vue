<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'
import { ref, onMounted } from 'vue'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      console.log(response.data)
      students.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div class="student-list">
    <h1>Students</h1>
    <div class="students">
      <StudentCard v-for="student in students" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
