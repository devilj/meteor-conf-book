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
        let findOne = Locations.findOne({
            _id: location._id,
            bookings: {
                startsAt: startsAt,
                owner: Meteor.user().username
            }
        });

        if (findOne) {
            Locations.update(location._id, {
                $pull: {
                    bookings: {
                        startsAt: startsAt,
                    }
                }
            });
        }
    }
});