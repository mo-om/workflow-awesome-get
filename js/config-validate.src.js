/*!
 * 表单验证参数配置文件config-validate.js
 * @author mo-om
 * @dependence [jQuery, jQuery.validate]
 * @app.formRules {Object} all form rules config;
 * @app.validateOpts {Object} default validate options of the form
 * @app.getFormValidateOpts {Function} return validate options which form you pass
 */

// $.validator.messages localized
$.extend($.validator.messages, {
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	email: "请输入正确格式的电子邮件",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	remote: "请修正该字段",
	accept: "请输入拥有合法后缀名的字符串",
	dateISO: "请输入合法的日期 (ISO).",
	equalTo: "请再次输入相同的值",
	required: "该字段为必填字段",
	creditcard: "请输入合法的信用卡号",
	max: $.validator.format("请输入一个最大为{0}的值"),
	min: $.validator.format("请输入一个最小为{0}的值"),
	range: $.validator.format("请输入一个介于{0}和{1}之间的值"),
	maxlength: $.validator.format("请输入一个长度最多是{0}的字符串"),
	minlength: $.validator.format("请输入一个长度最少是{0}的字符串"),
	rangelength: $.validator.format("请输入一个长度介于{0}和{1}之间的字符串")
});

app.formRules = app.formRules || {};
app.validateOpts = app.validateOpts || {};
app.getFormValidateOpts = app.getFormValidateOpts || function (form) {};

app.validateOpts = {
	debug: true,
    ignore: ':disabled, .ignore',
    success: 'valid',
    errorClass: 'form-error-tips',
    errorElement: 'span',
    errorPlacement: function (error, element) {
    	// console.log(error, element)
    	var labelItem = element.closest('.label-item'),
    		parentItem = element.parent(),
        	parent = labelItem.size() ? labelItem : parentItem;

        parent.addClass('pos-rel');
        error.appendTo(parent);
    },
    messages: {
    	numCorrections: {
    		digits: '请输入整数 n , n > 0 , 推荐 3 < n < 10'
    	},
    	processName: {
    		remote: '该流程名已存在，请重新输入'
    	}
    }
};

app.formRules = {
	'hdfs-file': {
		copies: { required: true, digits: true },
		splitor: { required: true },
		hdfs_path: { required: true },
		cluster_address: { required: true }
	},
	'hive-table': {
		db_name: { required: true },
		dt_name: { required: true }
	},
	'hdfs-storage': {
		hdfs_path: { required: true },
		cluster_address: { required: true }
	},
	sql: {
		db_name: { required: true },
		// dt_name: { required: true },
		sql_statement: { required: true }
	},
	'random-data': {
		method: { required: true },
		nums: { required: true, digits: true, min: 1 },
		partitions: { required: true, digits: true, min: 0 },
		seed: { required: true, digits: true },
		mean: { required: true, number: true },
		sigma: { required: true, number: true },
		rangeStart: { required: true, number: true },
		rangeEnd: { required: true, number: true },
		lambda: { required: true, number: true }
	},
	select: {
		// selectCols: { required: true },
		// removeCols: { required: true }
	},
	filter: {
		targetCol: { required: true, digits: true, min: 0 },
		filterCond: { required: true },
		filterValue: { required: true }
	},
	sample: {
		withReplacement: { required: true },
		fraction: { required: true, number: true, range: [0,1] }
	},
	groupby: {
		keyCol: { required: true, digits: true, min: 0},
		valueCol: { required: true, digits: true, min: 0},
		method: { required: true }
	},
	logistic: {
		updater: { required: true },
		regParam: { required: true, number: true },
		gradient: { required: true },
		stepSize: { required: true, number: true },
		optimizer: { required: true },
		targetcol: { required: true, digits: true, min: 0 },
		trainRatio: { required: true, range: [0,1] },
		numIterations: { required: true, digits: true },
		numCorrections: { required: true, digits: true },
		convergenceTol: { required: true },
		miniBatchFraction: { required: true, number: true }
	},
	svm: {
		updater: { required: true },
		regParam: { required: true, number: true },
		gradient: { required: true },
		stepSize: { required: true, number: true },
		optimizer: { required: true },
		targetcol: { required: true, digits: true, min: 0 },
		trainRatio: { required: true, range: [0,1] },
		numIterations: { required: true, digits: true },
		numCorrections: { required: true, digits: true },
		convergenceTol: { required: true },
		miniBatchFraction: { required: true, number: true }
	},
	'linear-regression': {
		updater: { required: true },
		regParam: { required: true, number: true },
		gradient: { required: true },
		stepSize: { required: true, number: true },
		optimizer: { required: true },
		targetcol: { required: true, digits: true, min: 0 },
		trainRatio: { required: true, range: [0,1] },
		numIterations: { required: true, digits: true },
		numCorrections: { required: true, digits: true },
		convergenceTol: { required: true },
		miniBatchFraction: { required: true, number: true }
	},
	statistics: {
		max: { required: true },
		min: { required: true },
		mean: { required: true },
		variance: { required: true },
		numNonzeros: { required: true }
	},
	correlations: {
		xcol: { required: true, digits: true, min: 0 },
		ycol: { required: true, digits: true, min: 0 },
		correType: { required: true }
	},
	'chisq-test': {
		targetCol: { required: true, digits: true, min: 0 }
	},
	'stratified-sampling': {
		keyCol: { required: true, digits: true, min: 0 },
		fractions: { required: true },
		isExact: { required: true },
		withReplacement: { required: true }
	},
	'decision-tree': {
		treeType: { required: true },
		targetCol: { required: true, digits: true, min: 0 },
		numClasses: { required: true, digits: true, min: 1 },
		impurity: { required: true },
		maxDepth: { required: true, digits: true, min: 1 },
		maxBins: { required: true, digits: true, min: 1 }
	},
	'naive-bayes': {
		targetCol: { required: true, digits: true, min: 0 },
		trainRatio: { required: true, range: [0,1] },
		lambda: { required: true, number: true }
	},
	kmeans: {
		k: { required: true, digits: true, min: 2 },
		maxIterations: { required: true, digits: true, min: 1 },
		initializationMode: { required: true },
		runs: { required: true, digits: true, min: 1 },
		initializationSteps: { required: true, digits: true, min: 1 },
		epsilon: { required: true }
	},
	als: {
		numBlocks: { required: true, number: true },
		rank: { required: true, digits: true, min: 1 },
		iterations: { required: true, digits: true, min: 1 },
		lambda: { required: true, number: true },
		implicitPrefs: { required: true },
		alpha: { required: true, number: true }
	},
	svd: {
		singValueNum: { required: true, digits: true },
		computeU: { required: true },
		rCond: { required: true, range: [0,1] }
	},
	pca: {
		pcNum: { required: true, digits: true },
	},
	join: {
		targetCol: { required: true, digits: true },
	},
	'process-form': {
		processName: { required: true, remote: 'json/check-name.js' }
	}
};

app.getFormValidateOpts = function (form) {
	return $.extend( {}, app.validateOpts, { rules: app.formRules[$(form).data('type')] } );
};