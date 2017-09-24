import moment from 'moment';

export default class ModalController {
    constructor($scope, $uibModalInstance, location, startsAt, endsAt) {
        let format = 'ddd MMM D hh:mma';
        Object.assign(this, {$scope, $uibModalInstance, location,
            startsAt: moment(startsAt).format(format),
            endsAt: moment(endsAt).format(format)
        });
    }

    ok() {
        this.$uibModalInstance.close(this.$scope.title);
    };

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    };
}

ModalController.constructor.$inject = ['$scope', '$uibModalInstance', 'location'];