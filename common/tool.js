const tool = {}

/* 删除对象固有字段 */
tool.deleteParams = (form, ...arg) => {
  arg.forEach((v, i) => {
    delete form[v]
  })
  return form
}

export default tool