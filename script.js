// Function to calculate and display total subscription amount
function calculateTotalSubscription() {
    const churchSubscription = parseFloat(document.getElementById('churchSubscription').value) || 0;
    const mensFellowship = parseFloat(document.getElementById('mensFellowship').value) || 0;
    const womensFellowship = parseFloat(document.getElementById('womensFellowship').value) || 0;
    const youthFellowship = parseFloat(document.getElementById('youthFellowship').value) || 0;
    const dfs = parseFloat(document.getElementById('dfs').value) || 0;
    const auctionDue = parseFloat(document.getElementById('auctionDue').value) || 0;
    const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;
    const totalSubscription = churchSubscription + mensFellowship + womensFellowship + youthFellowship + dfs + auctionDue + maintenance;
    document.getElementById('totalSubscription').value = totalSubscription;
}

// Function to calculate and display total other offerings amount
function calculateTotalOtherOfferings() {
    const worshipOffering = parseFloat(document.getElementById('worshipOffering').value) || 0;
    const thanksOffering = parseFloat(document.getElementById('thanksOffering').value) || 0;
    const churchMaintenance = parseFloat(document.getElementById('churchMaintenance').value) || 0;
    const auction = parseFloat(document.getElementById('auction').value) || 0;
    const lukeChurchOffering = parseFloat(document.getElementById('lukeChurchOffering').value) || 0;
    const lukeChurchSubscription = parseFloat(document.getElementById('lukeChurchSubscription').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const totalOtherOfferings = worshipOffering + thanksOffering + churchMaintenance + auction + lukeChurchOffering + lukeChurchSubscription + others;
    document.getElementById('totalOtherOfferings').value = totalOtherOfferings;
}

// Function to calculate and display age based on date of birth
function calculateAge() {
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    document.getElementById('age').value = age;
}

// Add event listener to calculate age when date of birth is entered
document.getElementById('dob').addEventListener('change', calculateAge);

// Add event listeners to fellowship amount fields
document.getElementById('churchSubscription').addEventListener('input', calculateTotalSubscription);
document.getElementById('mensFellowship').addEventListener('input', calculateTotalSubscription);
document.getElementById('womensFellowship').addEventListener('input', calculateTotalSubscription);
document.getElementById('youthFellowship').addEventListener('input', calculateTotalSubscription);
document.getElementById('dfs').addEventListener('input', calculateTotalSubscription);
document.getElementById('auctionDue').addEventListener('input', calculateTotalSubscription);
document.getElementById('maintenance').addEventListener('input', calculateTotalSubscription);

// Add event listeners to other offerings fields
document.getElementById('worshipOffering').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('thanksOffering').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('churchMaintenance').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('auction').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('lukeChurchOffering').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('lukeChurchSubscription').addEventListener('input', calculateTotalOtherOfferings);
document.getElementById('others').addEventListener('input', calculateTotalOtherOfferings);

// Add member function
document.getElementById('add-member-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const memberId = document.getElementById('memberId').value;
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const relation = document.querySelector('input[name="relation"]:checked').value;
    const relationName = document.getElementById('relationName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;
    const weddingDay = document.getElementById('weddingDay').value || null;
    const paying3Percent = document.getElementById('paying3Percent').value;
    const payingSubscription = document.getElementById('payingSubscription').value;

    const member = {
        memberId: memberId,
        name: name,
        dob: dob,
        age: age,
        maritalStatus: maritalStatus,
        relation: relation,
        relationName: relationName,
        phoneNumber: phoneNumber,
        address: address,
        weddingDay: weddingDay,
        paying3Percent: paying3Percent,
        payingSubscription: payingSubscription,
        subscriptions: []
    };

    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));

    alert('Member added successfully');
    document.getElementById('add-member-form').reset();
});

// Search member function
document.getElementById('search-member-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const memberId = document.getElementById('searchMemberId').value;
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const member = members.find(m => m.memberId === memberId);

    if (member) {
        document.getElementById('member-details').innerHTML = `
            <p><strong>Member ID:</strong> ${member.memberId}</p>
            <p><strong>Name:</strong> ${member.name}</p>
            <p><strong>Date of Birth:</strong> ${member.dob}</p>
            <p><strong>Age:</strong> ${member.age}</p>
            <p><strong>Marital Status:</strong> ${member.maritalStatus}</p>
            <p><strong>${member.relation}'s Name:</strong> ${member.relationName}</p>
            <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Wedding Day:</strong> ${member.weddingDay}</p>
            <p><strong>Paying 3%:</strong> ${member.paying3Percent}</p>
            <p><strong>Paying Subscription:</strong> ${member.payingSubscription}</p>
            <p>--------------------------------------------</p>
            <h3>Subscription Details:</h3>
            <div id="subscription-details"></div>
        `;
        fetchSubscriptionDetails(member);
    } else {
        document.getElementById('member-details').innerHTML = '<p>No such member found</p>';
    }
});

// Fetch subscription details function
function fetchSubscriptionDetails(member) {
    const subscriptionDetailsDiv = document.getElementById('subscription-details');
    subscriptionDetailsDiv.innerHTML = '';
    member.subscriptions.forEach(subscription => {
        let months = subscription.months.length ? `<p><strong>For the months of:</strong> ${subscription.months.join(', ')}</p>` : '';

        subscriptionDetailsDiv.innerHTML += `
            <p><strong>Paid On:</strong> ${subscription.paidOn}</p>
            ${months}
            <p><strong>Church Subscription:</strong> ${subscription.churchSubscription}</p>
            <p><strong>Men's Fellowship:</strong> ${subscription.mensFellowship}</p>
            <p><strong>Women's Fellowship:</strong> ${subscription.womensFellowship}</p>
            <p><strong>Youth Fellowship:</strong> ${subscription.youthFellowship}</p>
            <p><strong>DFS:</strong> ${subscription.dfs}</p>
            <p><strong>Auction Due:</strong> ${subscription.auctionDue}</p>
            <p><strong>Maintenance:</strong> ${subscription.maintenance}</p>
            <p><strong>Total amount as per the Subscription Card:</strong> ${subscription.totalSubscription}</p>
            <hr>
        `;
    });
}

// Show subscription form for a specific member
function showSubscriptionForm(memberId) {
    document.getElementById('subMemberId').value = memberId;
    document.getElementById('subscription-form').classList.remove('hidden');
}

// Submit subscription amount function
document.getElementById('subscription-form-fields').addEventListener('submit', function (e) {
    e.preventDefault();

    const memberId = document.getElementById('subMemberId').value;
    const churchSubscription = parseFloat(document.getElementById('churchSubscription').value) || 0;
    const mensFellowship = parseFloat(document.getElementById('mensFellowship').value) || 0;
    const womensFellowship = parseFloat(document.getElementById('womensFellowship').value) || 0;
    const youthFellowship = parseFloat(document.getElementById('youthFellowship').value) || 0;
    const dfs = parseFloat(document.getElementById('dfs').value) || 0;
    const auctionDue = parseFloat(document.getElementById('auctionDue').value) || 0;
    const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;
    const paidOn = document.getElementById('paidOn').value;
    const months = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const totalSubscription = churchSubscription + mensFellowship + womensFellowship + youthFellowship + dfs + auctionDue + maintenance;

    const subscription = {
        churchSubscription: churchSubscription,
        mensFellowship: mensFellowship,
        womensFellowship: womensFellowship,
        youthFellowship: youthFellowship,
        dfs: dfs,
        auctionDue: auctionDue,
        maintenance: maintenance,
        paidOn: paidOn,
        months: months,
        totalSubscription: totalSubscription
    };

    let members = JSON.parse(localStorage.getItem('members')) || [];
    const memberIndex = members.findIndex(m => m.memberId === memberId);
    if (memberIndex !== -1) {
        members[memberIndex].subscriptions.push(subscription);
        localStorage.setItem('members', JSON.stringify(members));
        alert('Subscription added successfully');
        document.getElementById('subscription-form-fields').reset();
        document.getElementById('totalSubscription').value = 0;
        document.getElementById('subscription-form').classList.add('hidden');
        fetchSubscriptionDetails(members[memberIndex]); // Refresh subscription details
    }
});

// Submit other offerings function
document.getElementById('other-offerings-form-fields').addEventListener('submit', function (e) {
    e.preventDefault();

    const worshipOffering = parseFloat(document.getElementById('worshipOffering').value) || 0;
    const thanksOffering = parseFloat(document.getElementById('thanksOffering').value) || 0;
    const churchMaintenance = parseFloat(document.getElementById('churchMaintenance').value) || 0;
    const auction = parseFloat(document.getElementById('auction').value) || 0;
    const lukeChurchOffering = parseFloat(document.getElementById('lukeChurchOffering').value) || 0;
    const lukeChurchSubscription = parseFloat(document.getElementById('lukeChurchSubscription').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const totalOtherOfferings = worshipOffering + thanksOffering + churchMaintenance + auction + lukeChurchOffering + lukeChurchSubscription + others;
    const paidOn = document.getElementById('paidOnOther').value;

    const otherOfferings = {
        worshipOffering: worshipOffering,
        thanksOffering: thanksOffering,
        churchMaintenance: churchMaintenance,
        auction: auction,
        lukeChurchOffering: lukeChurchOffering,
        lukeChurchSubscription: lukeChurchSubscription,
        others: others,
        totalOtherOfferings: totalOtherOfferings,
        paidOn: paidOn
    };

    let otherOfferingsList = JSON.parse(localStorage.getItem('otherOfferings')) || [];
    otherOfferingsList.push(otherOfferings);
    localStorage.setItem('otherOfferings', JSON.stringify(otherOfferingsList));

    alert('Other offerings added successfully');
    document.getElementById('other-offerings-form-fields').reset();
    document.getElementById('totalOtherOfferings').value = 0;
});

// Function to get total amount by date
document.getElementById('date-report-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const reportDate = document.getElementById('reportDate').value;
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const otherOfferingsList = JSON.parse(localStorage.getItem('otherOfferings')) || [];
    let totalSubscriptionAmount = 0;
    let churchSubscriptionTotal = 0;
    let mensFellowshipTotal = 0;
    let womensFellowshipTotal = 0;
    let youthFellowshipTotal = 0;
    let dfsTotal = 0;
    let auctionDueTotal = 0;
    let maintenanceTotal = 0;
    let totalOtherOfferings = 0;
    let worshipOfferingTotal = 0;
    let thanksOfferingTotal = 0;
    let churchMaintenanceTotal = 0;
    let auctionTotal = 0;
    let lukeChurchOfferingTotal = 0;
    let lukeChurchSubscriptionTotal = 0;
    let othersTotal = 0;
    let overallAmount = 0;

    members.forEach(member => {
        member.subscriptions.forEach(subscription => {
            if (subscription.paidOn === reportDate) {
                totalSubscriptionAmount += subscription.totalSubscription;
                churchSubscriptionTotal += subscription.churchSubscription;
                mensFellowshipTotal += subscription.mensFellowship;
                womensFellowshipTotal += subscription.womensFellowship;
                youthFellowshipTotal += subscription.youthFellowship;
                dfsTotal += subscription.dfs;
                auctionDueTotal += subscription.auctionDue;
                maintenanceTotal += subscription.maintenance;
            }
        });
    });

    otherOfferingsList.forEach(offerings => {
        if (offerings.paidOn === reportDate) {
            worshipOfferingTotal += offerings.worshipOffering;
            thanksOfferingTotal += offerings.thanksOffering;
            churchMaintenanceTotal += offerings.churchMaintenance;
            auctionTotal += offerings.auction;
            lukeChurchOfferingTotal += offerings.lukeChurchOffering;
            lukeChurchSubscriptionTotal += offerings.lukeChurchSubscription;
            othersTotal += offerings.others;
            totalOtherOfferings += offerings.totalOtherOfferings;
        }
    });

    overallAmount = totalSubscriptionAmount + totalOtherOfferings;

    document.getElementById('date-report-details').innerHTML = `
        <h3>Total Amount Received on ${reportDate}:</h3>
        <table class="total-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Total amount as per the Subscription Card</strong></td>
                    <td>${totalSubscriptionAmount}</td>
                </tr>
            </tbody>
        </table>
        <table class="total-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Church Subscription</td>
                    <td>${churchSubscriptionTotal}</td>
                </tr>
                <tr>
                    <td>Men's Fellowship</td>
                    <td>${mensFellowshipTotal}</td>
                </tr>
                <tr>
                    <td>Women's Fellowship</td>
                    <td>${womensFellowshipTotal}</td>
                </tr>
                <tr>
                    <td>Youth Fellowship</td>
                    <td>${youthFellowshipTotal}</td>
                </tr>
                <tr>
                    <td>DFS</td>
                    <td>${dfsTotal}</td>
                </tr>
                <tr>
                    <td>Auction Due</td>
                    <td>${auctionDueTotal}</td>
                </tr>
                <tr>
                    <td>Maintenance</td>
                    <td>${maintenanceTotal}</td>
                </tr>
            </tbody>
        </table>
        <table class="total-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Total Other Offerings</strong></td>
                    <td>${totalOtherOfferings}</td>
                </tr>
                <tr>
                    <td>Worship Offering</td>
                    <td>${worshipOfferingTotal}</td>
                </tr>
                <tr>
                    <td>Thanks Offering</td>
                    <td>${thanksOfferingTotal}</td>
                </tr>
                <tr>
                    <td>Church Maintenance</td>
                    <td>${churchMaintenanceTotal}</td>
                </tr>
                <tr>
                    <td>Auction</td>
                    <td>${auctionTotal}</td>
                </tr>
                <tr>
                    <td>Luke Church Offering</td>
                    <td>${lukeChurchOfferingTotal}</td>
                </tr>
                <tr>
                    <td>Luke Church Subscription Amount</td>
                    <td>${lukeChurchSubscriptionTotal}</td>
                </tr>
                <tr>
                    <td>Others</td>
                    <td>${othersTotal}</td>
                </tr>
            </tbody>
        </table>
        <table class="total-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Overall Amount</strong></td>
                    <td>${overallAmount}</td>
                </tr>
            </tbody>
        </table>
    `;
});
