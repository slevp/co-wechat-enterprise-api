var util = require('./util');
var postJSON = util.postJSON;

/**
 * 创建标签
 *
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理标签
 * Examples:
 * ```
 * var result = await api.createTag(name);
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "created",
 *  "tagid": "1"
 * }
 * ```
 * @param {String} name 标签名字
 */
exports.createTag = async function (name) {
  var token = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/tag/create?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/create?access_token=' + token.accessToken;
  var data = {
    tagname: name
  };
  return this.request(url, postJSON(data));
};

/**
 * 更新标签名字
 *
 * Examples:
 * ```
 * var result = await api.updateTagName(id, name);
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "updated"
 * }
 * ```
 * @param {String} id 标签ID
 * @param {String} name 标签名称。最长64个字符
 */
exports.updateTagName = async function (id, name) {
  var token = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/tag/update?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/update?access_token=' + token.accessToken;
  var data = {
    tagid: id,
    tagname: name
  };
  return this.request(url, postJSON(data));
};

/**
 * 删除标签
 *
 * Examples:
 * ```
 * var result = await api.deleteTag(id);
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "deleted"
 * }
 * ```
 * @param {Number} id 标签ID
 */
exports.deleteTag = async function (id) {
  var token = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/tag/delete?access_token=ACCESS_TOKEN&tagid=1
  var url = this.prefix + 'tag/delete?access_token=' + token.accessToken + '&tagid=' + id;
  var opts = {
    dataType: 'json',
  };
  return this.request(url, opts);
};

/**
 * 获取标签列表
 *
 * Examples:
 * ```
 * var result = await api.listTags();
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "deleted"
 * }
 * ```
 */
exports.listTags = async function () {
  var token = await this.ensureAccessToken();
  var url = this.prefix + 'tag/list?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
  };
  return this.request(url, opts);
};
/**
 * 获取标签成员
 *
 * Examples:
 * ```
 * var result = await api.getTagUsers(id);
 * ```
 *
 * Result:
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "userlist": [
 *     {
 *         "userid": "zhangsan",
 *         "name": "李四"
 *     }
 *   ]
 * }
 * ```
 * @param {Number} id 标签ID
 */
exports.getTagUsers = async function (id) {
  var token = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=ACCESS_TOKEN&tagid=1
  var url = this.prefix + 'tag/get?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      tagid: id
    }
  };
  this.request(url, opts, wrapper(callback));
};

/**
 * 增加标签成员
 *
 * Examples:
 * ```
 * var userIdList = ['id1', 'id2'];
 * var result = await api.addTagUsers(id, userIdList);
 * ```
 *
 * Result:
 * a)正确时返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "deleted"
 * }
 * ```
 * b)若部分userid非法，则返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "invalid userlist failed"
 *   "invalidlist"："usr1|usr2|usr"
 * }
 * ```
 * c)当包含的userid全部非法时返回
 * ```
 * {
 *   "errcode": 40031,
 *   "errmsg": "all list invalid"
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Array} userIdList 用户ID列表
 */
exports.addTagUsers = async function (id, userIdList) {
  var token = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/addtagusers?access_token=' + token.accessToken;
  var data = {
    tagid: id,
    userlist: userIdList
  };
  return this.request(url, postJSON(data));
};

/**
 * 删除标签成员
 *
 * Examples:
 * ```
 * var userIdList = ['id1', 'id2'];
 * var result = await api.deleteTagUsers(id, userIdList);
 * ```
 *
 * Result:
 * a)正确时返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "deleted"
 * }
 * ```
 * b)若部分userid非法，则返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "invalid userlist failed"
 *   "invalidlist"："usr1|usr2|usr"
 * }
 * ```
 * c)当包含的userid全部非法时返回
 * ```
 * {
 *   "errcode": 40031,
 *   "errmsg": "all list invalid"
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Array} userIdList 用户ID数组
 * @param {Function} callback 回调函数
 */
exports.deleteTagUsers = async function (id, userIdList, callback) {
  var token = await this.ensureAccessToken();
  var url = this.prefix + 'tag/deltagusers?access_token=' + token.accessToken;
  var data = {
    tagid: id,
    userlist: userIdList
  };
  return this.request(url, postJSON(data));
};
