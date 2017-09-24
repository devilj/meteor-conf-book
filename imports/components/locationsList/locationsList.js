import {Locations} from '../../api/locations';

export default class RoomListController {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
            locationsList() {
                return Locations.find({}, {sort: {name: 1}, code: 1, name: 0}).fetch();
            }
        })
    }
}

RoomListController.constructor.$inject = ['$scope'];