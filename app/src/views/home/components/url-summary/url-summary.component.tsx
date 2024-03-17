/* eslint-disable react/jsx-no-target-blank */
import { Button, Space, Table, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { UrlObject } from "../../../../types/url";
import moment from "moment";
import "./url-summary.style.css";

const limitString = (text: string, limit: number) => {
	return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

type UrlSummaryProps = {
	urlObjects: UrlObject[];
};

export const UrlSummary = (props: UrlSummaryProps) => {
	return (
		<Space direction="vertical" className="url-summary__container">
			<Table
				pagination={false}
				rowKey={(record) => record._id}
				scroll={{ x: "100%", y: "100%" }}
				dataSource={props.urlObjects}
				columns={[
					{
						title: "Short URL",
						dataIndex: "shortUrl",
						key: "shortUrl",
						render: (text: string, record: UrlObject) => {
							const shortUrl = record.domain + "/" + record.alias;
							return (
								<Space>
									<Button
										onClick={() =>
											navigator.clipboard.writeText(
												shortUrl
											)
										}
										style={{
											borderRadius: "20px",
											color: "GrayText",
										}}
										type="text"
										icon={<CopyOutlined />}
									/>
									<a target="_blank" href={text}>
										{limitString(shortUrl, 20)}
									</a>
								</Space>
							);
						},
					},
					{
						title: "Original URL",
						dataIndex: "source",
						key: "source",
						render: (text: string, record: UrlObject) => (
							<a target="_blank" href={record.url}>
								{limitString(text, 50)}
							</a>
						),
					},
					{
						title: "Clicks",
						dataIndex: "clicks",
						key: "clicks",
						align: "center",
						sorter: (a: UrlObject, b: UrlObject) =>
							a.clicks - b.clicks,
					},
					{
						title: "Status",
						dataIndex: "expireAt",
						key: "expireAt",
						align: "center",
						render: (text: string | null) =>
							text ? (
								moment().isAfter(text) ? (
									<Typography.Text type="warning">
										Expired
									</Typography.Text>
								) : (
									<Typography.Text type="success">
										Active
									</Typography.Text>
								)
							) : (
								<Typography.Text type="success">
									Active
								</Typography.Text>
							),
					},
					{
						title: "Date",
						dataIndex: "createdAt",
						key: "createdAt",
						sorter: (a: UrlObject, b: UrlObject) =>
							moment(a.createdAt).unix() -
							moment(b.createdAt).unix(),
						render: (text: string) => moment(text).fromNow(),
					},
				]}
			/>
		</Space>
	);
};
