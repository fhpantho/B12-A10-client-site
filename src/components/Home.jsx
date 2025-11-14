import React from 'react';
import Banner from './Header/Banner';
import RecentPublicHabits from './RecentPublicHabit';
import WhyHabits from './WhyHabits';
import HowHabitTrackerWorks from './HowHabitTrackerWorks';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentPublicHabits></RecentPublicHabits>
            <WhyHabits></WhyHabits>
            <HowHabitTrackerWorks></HowHabitTrackerWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;