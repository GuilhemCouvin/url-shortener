import { useState } from "react";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Space,
	Switch,
	Typography,
} from "antd";
import { shortenUrlApi } from "./url-input.service";
import { useForm } from "antd/es/form/Form";
import { UrlObject } from "../../../../types/url";
import dayjs, { Dayjs } from "dayjs";
import "./url-input.style.css";

type UrlInputProps = {
	setUrlObjects: React.Dispatch<React.SetStateAction<UrlObject[]>>;
};

export const UrlInput = (props: UrlInputProps) => {
	const [form] = useForm();
	const [checkCopy, setCheckCopy] = useState(false);
	const [expireAt, setExpireAt] = useState<Date>();

	const onFinish = (values: any) => {
		shortenUrl(values.url);
	};

	const shortenUrl = async (url: string) => {
		try {
			const response = await shortenUrlApi(url, expireAt);
			if (response) {
				props.setUrlObjects((prev) => [
					...prev.filter((u) => u._id !== response._id),
					response,
				]);
				if (checkCopy) navigator.clipboard.writeText(response.shortUrl);
			}
			form.resetFields();
		} catch (error) {
			console.error(error);
		}
	};

	const onChangeExpireAt = (expireAt: Dayjs) => {
		setExpireAt(expireAt.toDate());
	};

	return (
		<Space
			direction="vertical"
			className="url-input__container"
			size={"large"}
		>
			<Space className="url-input__text">
				<Form form={form} onFinish={onFinish}>
					<Form.Item
						name="url"
						style={{
							marginBottom: "0px",
						}}
						rules={[
							{
								required: true,
								message: "Please input your URL!",
							},
						]}
					>
						<Input
							style={{
								width: "300px",
							}}
							placeholder="URL"
							variant="borderless"
						/>
					</Form.Item>
				</Form>

				<DatePicker
					placeholder="Expire at"
					minDate={dayjs()}
					onChange={onChangeExpireAt}
				/>

				<Button
					className="primary-btn"
					type="primary"
					onClick={() => form.submit()}
				>
					Shorten now!
				</Button>
			</Space>
			<Space className="url-input__copy">
				<Switch
					checked={checkCopy}
					onChange={() => setCheckCopy(!checkCopy)}
				/>
				<Typography.Text type="secondary">
					Auto copy to clipboard
				</Typography.Text>
			</Space>
		</Space>
	);
};
