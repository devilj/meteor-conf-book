import {Config} from 'angular-ecmascript/module-helpers';
import locationsListTemplateUrl from '../imports/components/locationsList/locationsList.html';
import LocationsListController from '../imports/components/locationsList/locationsList';
import BookingController from "../imports/components/booking/bookingCtrl";
import bookingTemplateUrl from "../imports/components/booking/booking.html";
import {Locations} from "../imports/api/locations";

export default class RoutesConfig extends Config {
    configure() {
        this.$stateProvider
            .state('list', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: locationsListTemplateUrl,
                        controller: LocationsListController,
                        controllerAs: '$ctrl'
                    }
                }
            })
            .state('book', {
                url: '/:code/book',
                views: {
                    'main': {
                        templateUrl: bookingTemplateUrl,
                        controller: BookingController,
                        controllerAs: '$ctrl',
                    }
                },
                resolve: {
                    location: ($q, $stateParams) => {

                        // we need to wait for meteor collection to initialize
                        // there seems to be no reliable way to do that without Meteor.subscribe
                        // see https://stackoverflow.com/questions/46376248/meteorjs-connection-delay-issues/46377207
                        let defer = $q.defer();

                        let location = null;
                        setInterval(function () {
                            if (location = Locations.findOne({code: $stateParams.code}) ) {
                                defer.resolve(location);
                            }
                        });

                        return defer.promise;

                    }
                }

            });

        this.$urlRouterProvider.otherwise('/');
    }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];