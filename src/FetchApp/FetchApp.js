import React from 'react'
import Users from '../Users/Users'
import Months from '../Months/Months'
import Preloader from '../Preloader/Preloader'
import Button from '../Button/Button'

class FetchApp extends React.Component {
    state = {
        isFetching: false,
        isFiltering: false,
        months: [
            {
                number: 1,
                name: 'January',
                color: null
            },
            {
                number: 2,
                name: 'February',
                color: null
            },
            {
                number: 3,
                name: 'March',
                color: null
            },
            {
                number: 4,
                name: 'April',
                color: null
            },
            {
                number: 5,
                name: 'May',
                color: null
            },
            {
                number: 6,
                name: 'June',
                color: null
            },
            {
                number: 7,
                name: 'July',
                color: null
            },
            {
                number: 8,
                name: 'August',
                color: null
            },
            {
                number: 9,
                name: 'September',
                color: null
            },
            {
                number: 10,
                name: 'October',
                color: null
            },
            {
                number: 11,
                name: 'November',
                color: null
            },
            {
                number: 12,
                name: 'December',
                color: null
            }
        ],
        users: [],
        filteredUsers: [],
    }

    setColors() {
        let months = JSON.parse(JSON.stringify(this.state.months)); // changable array of months
        const dobs = this.state.users.map(user => { // array of DoB's (as integer)
            const dob = user.dob;
            return +dob.substring(dob.indexOf('T') - 5, dob.indexOf('T') - 3);
        });
        months = months.map(month => { // creating a new array ready to set into the state
            const matches = dobs.filter(dob => dob === month.number).length; //the count of matches between DoB's and the number of month
           
            if(matches >= 0 && matches <= 2) {
                month.color = 'grey';
            } else if(matches >= 3 && matches <= 6) {
                month.color = 'blue';
            } else if(matches >= 7 && matches <= 10) {
                month.color = 'green';
            } else if(matches > 10){
                month.color = 'red';
            }

            return month;
        });
        this.setState({ // array of months with colors have been received, now it could be set into the state
            months
        });
    }

    async fetchUsers() {
        this.toggleFetching(); //fetching is on, show Preloader
        
        const response = await fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users');
        const users = await response.json();
        this.setState({
            users
        });

        this.toggleFetching(); //users have been set, turning off the Preloader
        this.setColors(); // users were set, color algorithm could be done
    }

    toggleFetching() {
        this.setState( state => ({
            isFetching: !state.isFetching
        }) );
    }

    turnOnFilter() {
        this.setState({
            isFiltering: true
        });
    }

    filterUsers(num) {
        this.turnOnFilter(); // turning on filtering

        const users = JSON.parse(JSON.stringify(this.state.users));
        let filtered = users.filter(user => {
            let dob = user.dob;
            return (+dob.substring(dob.indexOf('T') - 5, dob.indexOf('T') - 3) === num);
        });

        this.setState({
            filteredUsers: filtered,
        });
    }

    setInitial() {
        if(!this.state.isFiltering) return;
        this.setState({
            isFiltering: false
        })
    }

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        return (
            <main>
                {this.state.isFetching ?
                    <Preloader /> :
                    <React.Fragment>
                        <Months 
                            months={this.state.months} 
                            filterUsers={this.filterUsers.bind(this)} />
                        <Users 
                            users={this.state.isFiltering ? this.state.filteredUsers : this.state.users} />   
                        <Button 
                            handleClick={this.setInitial.bind(this)} 
                            isFiltering={this.state.isFiltering} /> 
                    </React.Fragment>}
            </main>
        )
    }
}

export default FetchApp;