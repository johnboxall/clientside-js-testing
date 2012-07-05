Maths = {
    add: function(a, b) {
        return a + b;
    }

  , asyncAdd: function(a, b, callback) {
        setTimeout(function() {
            callback(a + b);
        });
    }

  , subtract: function(a, b) {
        return b - a;
    }
};