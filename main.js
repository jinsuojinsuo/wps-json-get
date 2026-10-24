var JsonAddinStatus = { ok: false, message: "尚未注册自定义函数" };

function registerJsonFunction() {
    if (JsonAddinStatus.ok) return;
    try {
        var api = typeof wps !== "undefined" ? wps
            : typeof Application !== "undefined" ? Application : null;
        if (!api || typeof api.AddCustomFunction !== "function") {
            throw new Error("当前环境未提供 WPS 自定义函数接口，请在 WPS 表格中检查兼容性");
        }
        var result = api.AddCustomFunction("JSON", "GET", WpsJson.formula, WpsJson.metadata);
        if (result === false) throw new Error("WPS 未接受自定义函数注册");
        JsonAddinStatus = { ok: true, message: "已提交 JSON.GET 注册，请在单元格中验证" };
    } catch (error) {
        JsonAddinStatus = { ok: false, message: error.message };
    }
}

function OnAddinLoad() {
    registerJsonFunction();
    return true;
}

function OnJsonStatus() {
    registerJsonFunction();
    alert(JsonAddinStatus.message + "\n用法：=JSON.GET(A2,\"user.name\")");
}

registerJsonFunction();
