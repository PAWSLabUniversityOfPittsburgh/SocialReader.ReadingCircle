(function () {
    'use strict';
    
    var parentModule = (typeof window.parentModule === 'undefined') ? "" : window.parentModule;
    var componentPath = (typeof window.componentPath === 'undefined') ? "" : window.componentPath;

    directivesModule.directive('itemListNormal', itemListNormal);

    itemListNormal.$inject = [];

    function itemListNormal() {
        var componentPath = (typeof window.componentPath === 'undefined') ? "" : window.componentPath;

        var directive = {
            link: link,
            scope: {},
            controller: controller,
            controllerAs: 'vm',
            require: ['^'+parentModule, 'itemEditor'],
            templateUrl: componentPath + 'SocialReader.ReadingCircle/template.html',
            restrict: 'A'
        };
        
        return directive;

        function link(scope, element, attrs, controllers) {
            var managerController = controllers[0];
            var itemListNormalController = controllers[1];
            
            itemListNormalController.manager = managerController;
            
            itemListNormalController.initialize();
        }
        
        function controller($scope) {
            // View Model
            var vm = this;
            
            // Properties
            vm.manager = {};
            vm.items = [{ id: 1, name: "Glass", size: "Small" },
                        { id: 2, name: "Book", size: "Medium" },
                        { id: 3, name: "Box", size: "Large" }];
            
            // Methods
            vm.initialize = initialize;
            vm.modifyItem = modifyItem;
            vm.editItem = editItem;
            
            // Functions
            function initialize() {
                vm.manager.respondToUpdatesWith(modifyItem);
            }
            
            function modifyItem(item) {
                var x;
                for (x = 0; x < vm.items.length; x += 1) {
                    if (vm.items[x].id === item.id) {
                        vm.items[x].name = item.name;
                        vm.items[x].size = item.size;
                        return;
                    }
                }
            }
            
            function editItem(item) {
                vm.manager.editItem(item);
            }
        }
    }
}());
