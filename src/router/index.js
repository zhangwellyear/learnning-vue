import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import LayoutBase from "@/components/layout/LayoutBase.vue";
import BasicLayout from "@/components/layout/BasicLayout.vue";
import { notification } from "ant-design-vue";
import { check, isLogin } from "../utils/auth";
import findLast from "lodash/findLast";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: BasicLayout,
  },
  {
    path: "/user",
    hiddenInMenu: true,
    component: () =>
      import(
        /* webpackChunkName: "layouts" */
        "@/components/layout/UserLayout.vue"
      ),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
        name: "home",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login.vue"),
      },
      {
        path: "/user/register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: BasicLayout,
    meta: {
      title: "仪表盘",
      icon: "dashboard",
      authority: ["user", "admin"],
    },
    name: "dashboard",
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/dashboard/analysis",
        name: "Analysis",
        component: () => import("@/views/dashboard/Analysis"),
        meta: {
          title: "分析",
        },
      },
      {
        path: "/dashboard/monitor",
        name: "Monitor",
        component: () => import("@/views/dashboard/Monitor"),
        meta: {
          title: "监控",
        },
      },
      {
        path: "/dashboard/workplace",
        name: "Workplace",
        component: () => import("@/views/dashboard/Workplace"),
        meta: {
          title: "工作台",
        },
      },
    ],
  },
  {
    path: "/form",
    component: BasicLayout,
    name: "form",
    meta: {
      title: "表单",
      icon: "form",
      authority: ["admin"],
    },
    redirect: "/form/base-form",
    children: [
      {
        path: "/form/base-form",
        name: "base-form",
        meta: {
          title: "基础表单",
        },
        component: () => import("@/views/form/BasicForm"),
      },
      {
        path: "/form/step-form",
        name: "step-form",
        meta: {
          title: "分步表单",
        },
        component: () => import("@/views/form/StepForm"),
      },
      {
        path: "/form/advanced-form",
        name: "advanced-form",
        meta: {
          title: "高级表单",
        },
        component: () => import("@/views/form/AdvancedForm"),
      },
    ],
  },
  {
    path: "/list",
    component: LayoutBase,
    name: "list",
    meta: {
      title: "列表",
      icon: "list",
      authority: ["user", "admin"],
    },
    redirect: "/list/query-list",
    children: [
      {
        path: "/list/query-list",
        name: "QueryList",
        meta: {
          title: "查询列表",
        },
        component: () => import("@/views/list/QueryList"),
      },
      {
        path: "/list/edit-table",
        name: "EditList",
        meta: {
          title: "编辑列表",
        },
        component: () => import("@/views/list/TableInnerEditList"),
      },
      {
        path: "/list/role-list",
        name: "RoleList",
        meta: {
          title: "角色列表",
        },
        component: () => import("@/views/list/RoleList"),
      },
      {
        path: "/list/permission-list",
        name: "PermissionList",
        meta: {
          title: "权限列表",
        },
        component: () => import("@/views/list/PermissionList"),
      },
      {
        path: "/list/basic-list",
        name: "BasicList",
        hiddenInMenu: true,
        component: () => import("@/views/list/StandardList"),
      },
      {
        path: "/list/card",
        name: "CardList",
        component: () => import("@/views/list/CardList"),
      },
      {
        path: "/list/search",
        name: "SearchList",
        meta: {
          title: "搜索列表",
        },
        component: () => import("@/views/list/search/SearchLayout.vue"),
        redirect: "/list/search/articles",
        children: [
          {
            path: "/list/search/articles",
            name: "SearchArticles",
            meta: {
              title: "文章",
            },
            component: () => import("../views/list/TableList"),
          },
          {
            path: "/list/search/project",
            name: "SearchProjects",
            component: () => import("../views/list/TableList"),
          },
          {
            path: "/list/search/application",
            name: "SearchApplications",
            component: () => import("../views/list/TableList"),
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    hiddenInMenu: true,
    name: "profile",
    redirect: "/profile/basic",
    children: [
      {
        path: "/profile/basic",
        name: "ProfileBasic",
        component: () => import("@/views/profile/basic/Index"),
      },
      {
        path: "/profile/advanced",
        name: "ProfileAdvanced",
        component: () => import("@/views/profile/advanced/Advanced"),
      },
    ],
  },
  {
    path: "/result",
    component: LayoutBase,
    hiddenInMenu: true,
    name: "result",
    redirect: "/result/success",
    children: [
      {
        path: "/result/success",
        name: "ResultSuccess",
        component: () =>
          import(/* webpackChunkName: "result" */ "../views/result/Success"),
      },
      {
        path: "/result/fail",
        name: "ResultError",
        component: () =>
          import(/* webpackChunkName: "result" */ "../views/result/Error"),
      },
    ],
  },
  {
    path: "/exception",
    component: Layout,
    name: "exception",
    hiddenInMenu: true,
    redirect: "/exception/403",
    children: [
      {
        path: "/exception/403",
        name: "Exception403",
        component: () =>
          import(/* webpackChunkName: "fail" */ "@/views/exception/403"),
      },
      {
        path: "/exception/404",
        name: "Exception404",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "fail" */ "@/views/exception/404"),
      },
      {
        path: "/exception/500",
        name: "Exception500",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "fail" */ "@/views/exception/500"),
      },
    ],
  },
  {
    path: "/account",
    component: Layout,
    hiddenInMenu: true,
    name: "account",
    children: [
      {
        path: "/account/center",
        name: "center",
        component: () => import("@/views/account/center/Index"),
      },
      {
        path: "/account/settings",
        name: "settings",
        component: () => import("@/views/account/settings/Index"),
        redirect: "/account/settings/base",
        alwaysShow: true,
        children: [
          {
            path: "/account/settings/base",
            name: "BaseSettings",
            component: () => import("@/views/account/settings/BaseSetting"),
          },
          {
            path: "/account/settings/security",
            name: "SecuritySettings",
            component: () => import("@/views/account/settings/Security"),
          },
          {
            path: "/account/settings/custom",
            name: "CustomSettings",
            component: () => import("@/views/account/settings/Custom"),
          },
          {
            path: "/account/settings/binding",
            name: "BindingSettings",
            component: () => import("@/views/account/settings/Binding"),
          },
          {
            path: "/account/settings/notification",
            name: "NotificationSettings",
            component: () => import("@/views/account/settings/Notification"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/exception/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/exception/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。",
      });
      next({
        path: "/exception/403",
      });
    }
  }

  next();
});

router.afterEach((route) => {
  console.log(route);
});

export default router;
