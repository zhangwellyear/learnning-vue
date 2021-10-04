<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="this.$router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon"></a-icon>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";

export default {
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];

      routes.forEach((route) => {
        if (route.name && route.meta && !route.hiddenInMenu) {
          this.openKeysMap[route.path] = parentKeys;
          this.selectedKeysMap[route.path] = [selectedKey || route.path];
          const newRoute = { ...route };
          delete newRoute.children;

          if (route.children && !route.hiddenChildrenInMenu) {
            newRoute.children = this.getMenuData(route.children, [
              ...parentKeys,
              route.path,
            ]);
          } else {
            this.getMenuData(
              route.children,
              selectedKey ? parentKeys : [...parentKeys, route.path],
              selectedKey || route.path
            );
          }

          menuData.push(newRoute);
        } else if (
          !route.hiddenChildrenInMenu &&
          !route.hiddenInMenu &&
          route.children
        ) {
          menuData.push(...this.getMenuData(route.children), [
            ...parentKeys,
            route.path,
          ]);
        }
      });

      return menuData;
    },
  },
};
</script>
