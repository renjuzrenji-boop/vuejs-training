<template>
  <div class="workspace">
    <header class="topbar">
      <a class="brand" href="#" aria-label="People directory home">
        <span class="brand-mark">P</span>
        <span>People<span class="brand-divider"> / Directory</span></span>
      </a>
      <span class="workspace-label">PEOPLE OPERATIONS</span>
    </header>

    <main class="content">
      <section class="page-heading" aria-labelledby="page-title">
        <div>
          <h1 id="page-title">Employee profile</h1>
          <p class="page-description">Employee details and current role.</p>
        </div>
     </section>
      <EmployeeProfile />
    </main>
  </div>
</template>

<script>
import EmployeeProfile from "./src/components/EmployeeProfile.vue";

export default {
  name: "App",

  components: {
    EmployeeProfile
  }
};
</script>

<style>
:root {
  font-family: "Segoe UI", Tahoma, sans-serif;
  color: #202923;
  background: #f3f5f0;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

.workspace {
  min-height: 100vh;
  background-color: #f3f5f0;
  background-image: radial-gradient(#dce2d9 0.7px, transparent 0.7px);
  background-size: 18px 18px;
}

.topbar {
  height: 68px;
  padding: 0 max(28px, calc((100vw - 1080px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e7ebe5;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: #202923;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.brand-mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #fff;
  background: #32634f;
  font-family: Georgia, serif;
  font-size: 17px;
}

.brand-divider {
  color: #7a847d;
  font-weight: 400;
}

.workspace-label,
.eyebrow,
.record-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.1px;
}

.workspace-label {
  color: #7d877f;
}

.content {
  width: min(100% - 48px, 900px);
  margin: 0 auto;
  padding: 54px 0 80px;
}

.page-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;
}

.eyebrow {
  margin: 0 0 11px;
  color: #61776a;
}

.eyebrow span,
.record-label span {
  padding: 0 5px;
  color: #c4694f;
}

h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 1.15;
}

.page-description {
  margin: 8px 0 0;
  color: #707b73;
  font-size: 14px;
}

.record-label {
  margin: 0 0 5px;
  color: #879088;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .topbar {
    height: 60px;
    padding: 0 20px;
  }

  .workspace-label {
    font-size: 9px;
  }

  .content {
    width: min(100% - 32px, 500px);
    padding-top: 38px;
  }

  .page-heading {
    align-items: start;
    flex-direction: column;
    gap: 14px;
  }

  h1 {
    font-size: 30px;
  }
}
</style>