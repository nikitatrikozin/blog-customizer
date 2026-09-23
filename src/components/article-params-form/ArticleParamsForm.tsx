import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target;

			if (
				target instanceof Node &&
				containerRef.current &&
				!containerRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => {
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: option,
							}));
						}}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => {
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: option,
							}));
						}}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => {
							setFormState((prevState) => ({
								...prevState,
								fontColor: option,
							}));
						}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => {
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: option,
							}));
						}}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => {
							setFormState((prevState) => ({
								...prevState,
								contentWidth: option,
							}));
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
