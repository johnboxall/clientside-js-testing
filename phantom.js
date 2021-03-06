var System = require('system')
  , page = require('webpage').create()
  , fail = 0
  , url = 'http://127.0.0.1:3000/'

  , waitFor = function(testFn, onReady) {
        var start = new Date()
          , interval = setInterval(function() {
                if (testFn()) {
                    clearInterval(interval);
                    onReady();
                } else if (new Date() - start > 30 * 1000) {
                    console.log('Timeout.');
                    phantom.exit(1);
                }
            }, 100);
    }

  , exit = function(code) {
        console.log('Exited with code:', code)
        phantom.exit(code);
    }


page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onError = function(msg, trace) {
    console.log(msg);
};

page.open(url, function(status) {
    if (status !== 'success') {
        console.log("Couldn't open page: " + url);
        exit(1);
    }

    waitFor(function() {
        return page.evaluate(function() {
            var el = document.getElementById('qunit-testresult');
            return el && el.innerText.match('completed')
        });
    }, function() {
        var failedNum = page.evaluate(function() {
                var el = document.getElementById('qunit-testresult');
                try {
                    return el.getElementsByClassName('failed')[0].innerHTML;
                } catch (e) { }

                return 10000;
            });

        fail = fail || failedNum;
        exit(fail);
    });
});