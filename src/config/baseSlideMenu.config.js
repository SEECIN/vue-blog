export default{
  home:[
    {
      icon: "el-icon-edit-outline",
      route: "/editor"
    }
  ],
  index:[
    {
      icon: "el-icon-edit-outline",
      route: "/editor"
    }
  ],
  editor:[
    {
      icon:"el-icon-s-home",
      route:"/index"
    }
  ],
  user:[
    {
      icon:"el-icon-s-home",
      route:"/index"
    }
  ],
  article:[
    {
      icon:"el-icon-s-home",
      route:"/index"
    },
    {
      icon: "el-icon-star-on",
      handler:'changeLikes',
      query:"likes"
    },
    {
      icon: "el-icon-s-comment",
      handler:"focusComment"
    }
  ],
  column:[
    {
      icon:"el-icon-s-home",
      route:"/index"
    },
    {
      icon:"el-icon-document-add",
      handler:"addColumn"
    }
  ],
  chat:[
    {
      icon:"el-icon-s-home",
      route:"/index"
    }
  ]
}