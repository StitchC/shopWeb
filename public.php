<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>发布页</title>
<link rel="stylesheet" href="../themes/default/default.css" />
	<link rel="stylesheet" href="editor/plugins/code/prettify.css" />
	<script src="editor/kindeditor.js"></script>
	<script src="editor/lang/zh_CN.js"></script>
	<script src="editor/plugins/code/prettify.js"></script>
	<script>
		KindEditor.ready(function(K) {
			var editor1 = K.create('textarea[name="content1"]', {
				cssPath : 'editor/plugins/code/prettify.css',
				uploadJson : 'editor/php/upload_json.php',
				fileManagerJson : 'editor/php/file_manager_json.php',
				allowFileManager : true,
				afterCreate : function() {
					var self = this;
					K.ctrl(document, 13, function() {
						self.sync();
						K('form[name=example]')[0].submit();
					});
					K.ctrl(self.edit.doc, 13, function() {
						self.sync();
						K('form[name=example]')[0].submit();
					});
				}
			});
			prettyPrint();
		});
	</script>
</head>

<body>
  <form action="public_check.php" method="post" name="form" enctype="multipart/form-data">
    <p>标题<input type="text" name="title" /></p>
    <p>作者<input type="text" name="author" /></p>
    <p>内容<textarea name="content1"></textarea></p>
    <P>封面图片<input type="file" name="image" /></P>
    <input type="submit" value="提交" />
  </form>
</body>
</html>