import React from 'react';
import Banner from './Header/Banner';
import RecentPublicHabits from './RecentPublicHabit';
import WhyHabits from './WhyHabits';
import HowHabitTrackerWorks from './HowHabitTrackerWorks';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className="bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content transition-colors duration-300">
            <Banner />
            <RecentPublicHabits />
            <WhyHabits />
            <HowHabitTrackerWorks />
            <Testimonials />
        </div>
    );
};

export default Home;
