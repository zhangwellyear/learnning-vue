<template>
  <div>
    <a-layout
      :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]"
      id="components-layout-demo-side"
      style="min-height: 100vh"
    >
      <a-layout-sider
        :theme="navTheme"
        v-model="collapsed"
        collapsible
        :trigger="null"
        v-if="navLayout === 'left'"
        width="256px"
      >
        <div class="logo">Ant D Vue Pro</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
            class="collapsed-icon"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorize :authority="['admin']"> <SettingDrawer /> </Authorize>>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
import SettingDrawer from "../SettingDrawer/index.vue";

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>

<style scoped>
.collapsed-icon {
  line-height: 72px;
  height: 72px;
  font-size: 20px;
  padding: 0 20px;
}
.collapsed-icon:hover {
  background-color: #eee;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
