<script setup lang="ts">
import FirstToThirdCtgy from '../service'

const { firstCtgyList, firstCtgyActiveIndex, setActiveIndex, getAllCtgys } = FirstToThirdCtgy

getAllCtgys()
</script>

<template>
  <main class="content">
    <ul class="firstctgy">
      <li
        class="firstctgy-item" :class="{ 'firstctgy-item-active': firstCtgyActiveIndex === index }"
        @click="setActiveIndex(index)"
        v-for="(firstctgy, index) in firstCtgyList"
        :key="firstctgy.firstctgyId"
      >
        <span class="firstctgy-name"> {{ firstctgy.name }} </span>
      </li>
    </ul>
    <div class="secondctgy"></div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  width: 100%;
  top: 1.02rem;
  left: 0;
  bottom: 0.85rem;
  gap: 0.2rem;
  .firstctgy {
    width: 1.3rem;
    flex-basis: 1.3rem;
    overflow-y: auto;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.78rem;
      color: #333;
    }
    &-item-active {
      text-shadow: 0 0 0.02rem #2a2a2a;
      color: red;
      background-color: #f7f7f7;
      .firstctgy-name {
        width: 100%;
        text-align: center;
        border-left: 0.08rem solid rgba(255, 0, 0, 0.8);
      }
    }
  }
  .secondctgy {
    flex: 1;
    margin-right: 0.19rem;
  }
}
</style>
