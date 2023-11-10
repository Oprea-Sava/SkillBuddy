import React from "react";
import "../../css/dashboard/orderHistory.css";

function OrderHisory() {
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
					
				</div>
			</div>
		</>
	);
}

export default OrderHisory;
