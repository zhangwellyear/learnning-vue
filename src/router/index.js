import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import LayoutBase from "@/components/layout/LayoutBase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/user",
    component: () =>
      import(
        /* webpackChunkName: "layouts" */ "@/components/layout/UserLayout.vue"
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
    component: Layout,
    name: "dashboard",
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/dashboard/analysis",
        name: "Analysis",
        component: () => import("@/views/dashboard/Analysis"),
      },
      {
        path: "/dashboard/monitor",
        name: "Monitor",
        component: () => import("@/views/dashboard/Monitor"),
      },
      {
        path: "/dashboard/workplace",
        name: "Workplace",
        component: () => import("@/views/dashboard/Workplace"),
        meta: { title: "工作台", permission: ["dashboard"] },
      },
    ],
  },
  {
    path: "/form",
    component: LayoutBase,
    name: "form",
    redirect: "/form/base-form",
    children: [
      {
        path: "/form/base-form",
        name: "base-form",
        component: () => import("@/views/form/BasicForm"),
      },
      {
        path: "/form/step-form",
        name: "step-form",
        component: () => import("@/views/form/StepForm"),
      },
      {
        path: "/form/advanced-form",
        name: "advanced-form",
        component: () => import("@/views/form/AdvancedForm"),
      },
    ],
  },
  {
    path: "/list",
    component: LayoutBase,
    name: "list",
    redirect: "/list/query-list",
    children: [
      {
        path: "/list/query-list",
        name: "QueryList",
        component: () => import("@/views/list/QueryList"),
      },
      {
        path: "/list/edit-table",
        name: "EditList",
        component: () => import("@/views/list/TableInnerEditList"),
      },
      {
        path: "/list/role-list",
        name: "RoleList",
        component: () => import("@/views/list/RoleList"),
      },
      {
        path: "/list/permission-list",
        name: "PermissionList",
        component: () => import("@/views/list/PermissionList"),
      },
      {
        path: "/list/basic-list",
        name: "BasicList",
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
        component: () => import("@/views/list/search/SearchLayout.vue"),
        redirect: "/list/search/articles",
        children: [
          {
            path: "/list/search/articles",
            name: "SearchArticles",
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

export default router;
