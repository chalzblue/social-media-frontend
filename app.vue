<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #f5f5f5;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 10px;
  border: none;
  font-size: 12px;
  color: #fff;
}

// utility classes
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}
</style>
