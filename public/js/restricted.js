document.body.addEventListener('keydown', function(e) {
    if(e.which == 123 || (e.ctrlKey && e.shiftKey && (e.which == 73 || e.which == 75 || e.which == 67 || e.which == 74))) {
        e.preventDefault();
        showForm();
    }
});

function showForm() {
    var form = document.createElement('div');
    form.style.position = 'fixed';
    form.style.top = '50%';
    form.style.left = '50%';
    form.style.transform = 'translate(-50%, -50%)';
    form.style.background = '#f8f9fa';
    form.style.border = '1px solid #ced4da';
    form.style.padding = '20px';
    form.style.zIndex = '10000';
    form.style.color = '#212529'; // Đặt màu chữ đậm hơn để tăng độ rõ
    form.style.fontSize = '16px'; // Tăng kích thước chữ nếu cần
    form.style.fontFamily = 'Arial, sans-serif'; // Sử dụng font dễ đọc
    form.style.textAlign = 'center'; // Căn giữa văn bản
    form.innerHTML = 'DevTools is disabled on this website!';
    document.body.appendChild(form);

    setTimeout(function() {
        document.body.removeChild(form);
    }, 3000);
}


(function() {
    function detectDevTool(allow) {
        if(isNaN(+allow)) allow = 100;
        var start = +new Date();
        debugger;
        var end = +new Date();
        if(isNaN(start) || isNaN(end) || end - start > allow) {
            console.log('DEVTOOLS detected ' + allow);
            showForm();
        }
    }
    if(window.attachEvent) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            detectDevTool();
            window.attachEvent('onresize', detectDevTool);
            window.attachEvent('onmousemove', detectDevTool);
            window.attachEvent('onfocus', detectDevTool);
            window.attachEvent('onblur', detectDevTool);
        } else {
            setTimeout(arguments.callee, 0);
        }
    } else {
        window.addEventListener('load', detectDevTool);
        window.addEventListener('resize', detectDevTool);
        window.addEventListener('mousemove', detectDevTool);
        window.addEventListener('focus', detectDevTool);
        window.addEventListener('blur', detectDevTool);
    }
})();

window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showForm();
});
