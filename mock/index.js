const appData = {
  login: { success: 'true', message: '登陆成功' },
  fileList: {
    success: 'true',
    list: [
      { fileId: '1', fileName: 'a1.c', content: 'content-test1' },
      { fileId: '2', fileName: 'a2.c', content: 'content-test2' },
      { fileId: '3', fileName: 'a3.c', content: 'content-test2' },
      { fileId: '4', fileName: 'a4.c', content: 'content-test2' },
      { fileId: '5', fileName: 'a5.c', content: 'content-test2' },
      { fileId: '6', fileName: 'a8.c', content: 'content-test2' },
      { fileId: '7', fileName: 'a9.c', content: 'content-test2' },
    ],
  },
};

const proxy = {
  'GET /api/login': { success: appData.login.success, message: appData.login.message },
  'GET /api/list': [
    { id: 1, username: 'kenny', sex: 6 },
    { id: 2, username: 'kenny', sex: 6 },
  ],
  'GET /api/post': (req, res) => {
    console.log(req, res);
    res.send({ status: 'error', code: 200 });
  },
  'DELETE /api/remove': (req, res) => {
    res.send({ status: 'ok', message: '删除成功！' });
  },
};

module.exports = proxy;
