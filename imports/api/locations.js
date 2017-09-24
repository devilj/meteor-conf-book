import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Locations = new Mongo.Collection('locations');

Meteor.methods({
    'location.book' (location, booking) {

        Locations.update(location._id, {
            $push: {
                bookings: booking
            }
        });
    },
    'location.unbook' (location, startsAt) {
        Locations.update(location._id, {
            $pull: {
                bookings: {
                    startsAt: startsAt,
                }
            }
        });
    }
});