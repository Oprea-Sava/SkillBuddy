import React from "react";
import "../../css/dashboard/orderHistory.css";

function OrderHisory() {
	const orderInfo = [
		{
			orderId: "Order ID",
			courseName: "Course Name",
			date: "Date",
			price: "Price",
			status: "Status",
		},
	];

	const orders = [
		{
			orderId: "#2643",
			courseName:
				"Build Responsive Real World Websites " +
				"with HTML5 and CSS3 Learn and Understand AngularJS " +
				"to become a professional developer",
			date: "24 March 2023",
			price: "$34",
			status: "On Hold",
		},
		{
			orderId: "#2614",
			courseName: "Information About UI/UX Design Degree",
			date: "17 March 2023",
			price: "free",
			status: "On Hold",
		},
		{
			orderId: "#2643",
			courseName: "Information About UI/UX Design Degree",
			date: "29 January 2023",
			price: "$558",
			status: "Completed",
		},
	];

	return (
		<>
			<div id="orderHistory">
				<div className="orderHistoryTitle text">Order History</div>
				<div className="orderHistoryDetails">
					<div className="dateSelection">
						<div className="dateButtons">
							<button className="text">Today</button>
							<button className="text">Monthly</button>
							<button className="text">Yearly</button>
						</div>
						<div className="dateSearch">
							<form action="#">
								<input
									type="text"
									placeholder="DD MM YYYY -- DD MM YYYY"
								/>
								<input type="date" />
							</form>
						</div>
					</div>

					<div className="orderTable text">
						{orderInfo.map((info) => (
							<>
								<div className="orderId orderTableColumnTitle">
									{info.orderId}
								</div>
								<div className="courseName orderTableColumnTitle">
									{info.courseName}
								</div>
								<div className="date orderTableColumnTitle">
									{info.date}
								</div>
								<div className="price orderTableColumnTitle">
									{info.price}
								</div>
								<div className="status orderTableColumnTitle">
									{info.status}
								</div>
								<div></div>
							</>
						))}
						{orders.map((order) => (
							<>
								<div className="orderId">{order.orderId}</div>
								<div className="courseName">
									{order.courseName}
								</div>
								<div className="date">{order.date}</div>
								<div className="price">{order.price}</div>
								<div className="status">{order.status}</div>
								<div className="downloadButtonWrapper">
									<button className="downloadButton"></button>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default OrderHisory;
