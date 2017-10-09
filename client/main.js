import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-bootstrap-calendar';
import 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import angularMeteor from 'angular-meteor';
import Loader from 'angular-ecmascript/module-loader';
import '../imports/startup/accounts-config.js';
import RoutesConfig from './routes.js'

const App = 'conf-book';

angular.module(App, [
    angularMeteor,
    'accounts.ui',
    'ui.router',
    'ui.bootstrap',
    'mwl.calendar'
]).config(['$angularTemplatesSettings', function($angularTemplatesSettings) {
    // Turn off throwing errors
    // meteor can't find bootstrap calendar templates, but they are there!
    // need to take a look
    $angularTemplatesSettings.error = false;

    // Turn off displaying warnings inside console
    $angularTemplatesSettings.warning = false;

}]).config(['calendarConfig', function(calendarConfig) {

    // View all available config
    console.log(calendarConfig);

    calendarConfig.showTimesOnWeekView = true;

}]);

new Loader(App).load(RoutesConfig);



