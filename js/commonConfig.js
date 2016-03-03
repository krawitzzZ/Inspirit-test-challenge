define(['jquery'], function ($) {
    return {
        TaskFilter: {
            first: '#firstTask',
            second: '#secondTask',
            third: '#thirdTask'
        },
        queries: {
            $parentEl: $('#main'),
            $navBar: $('.nav li')
        },
        MAX_ERROR_COUNT: 5
    }


});