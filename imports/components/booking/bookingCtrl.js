import moment from 'moment';
import ModalController from './modal/modalCtrl';
import modalTemplateUrl from './modal/modal.html';

export default class BookingController {
    constructor($uibModal, $scope, location) {
        this.$uibModal = $uibModal;
        $scope.viewModel(this);

        this.calendarView = 'week';
        this.viewDate = moment().add(7, 'days');

        if (!location) return;
        this.location = location;

        this.events = location.bookings;
        _.each(this.events, this.addDeleteAction);

    }

    eventClicked(event) {
        console.log('event', event);
    }

    unbook(startsAt) {
        let eventFilter = (event) => {
            return event.startsAt === startsAt
        };
        let event = _.find(this.events, eventFilter);
        if (Meteor.user() && event.owner === Meteor.user().username) {
            Meteor.call('location.unbook', this.location, startsAt);
            this.events = _.reject(this.events, eventFilter);
        } else {
            alert('you can\'t touch this');
        }
    }

    openModal = (startsAt, endsAt) => {
        let modalInstance = this.$uibModal.open({
            templateUrl: modalTemplateUrl,
            controller: ModalController,
            controllerAs: '$ctrl',
            // size: 'sm',
            resolve: {
                location: this.location,
                startsAt: startsAt,
                endsAt: endsAt
            }
        });

        modalInstance.result.then((title) => {
            let booking = {
                startsAt: startsAt,
                endsAt: endsAt,
                title: title + ' for ' + Meteor.user().username,
                owner: Meteor.user().username
            };

            Meteor.call('location.book', this.location, booking);
            this.addDeleteAction(booking);
            this.events.push(booking);

        }, (reason) => {
            console.log('rejected');
        });
    };

    rangeSelected(startsAt, endsAt) {
        if (Meteor.user()) {
            this.openModal(startsAt, endsAt);
        }
    }

    step() {
        return this.calendarView === 'week' ? 7 : 1;
    }

    nextWeek() {
        this.viewDate = moment(this.viewDate).add(this.step(), 'days');
    }

    prevWeek() {
        this.viewDate = moment(this.viewDate).subtract(this.step(), 'days');
    }

    addDeleteAction = (booking) => {
        booking.actions = [{
            label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            onClick: (args) => {
                this.unbook(args.calendarEvent.startsAt);
            }
        }];
    }
}

BookingController.constructor.$inject = ['$uibModal', '$scope', 'location'];