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
	const [submittable, setSubmittable] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);

	const onFinish = (values: any) => {
		shortenUrl(values.url);
	};

	const shortenUrl = async (url: string) => {
		setLoading(true);
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
		setLoading(false);
	};

	const onChangeExpireAt = (expireAt: Dayjs) => {
		setExpireAt(expireAt.toDate());
	};

	const validateUrl = (_: any, value: string) => {
		const regex =
			/((http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/;
		if (value && !regex.test(value)) {
			setSubmittable(false);
			return Promise.reject("Invalid URL");
		}
		setSubmittable(true);
		return Promise.resolve();
	};

	return (
		<Space
			direction="vertical"
			className="url-input__container"
			size={"large"}
		>
			<Space className="url-input__text">
				<Form name="url-input" form={form} onFinish={onFinish}>
					<Form.Item
						name="url"
						style={{
							marginBottom: "0px",
						}}
						rules={[
							{ validator: validateUrl },
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
					loading={loading}
					disabled={!submittable}
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
