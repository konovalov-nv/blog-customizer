import { ArrowButton } from 'src/ui/arrow-button';
import { useEffect, useRef, useState, FormEvent, useCallback } from 'react';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const [formData, setFormData] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		setFormData(currentState);
	}, [currentState]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!isOpen) return;

			if (asideRef.current && asideRef.current.contains(event.target as Node)) {
				return;
			}

			if (
				arrowButtonRef.current &&
				arrowButtonRef.current.contains(event.target as Node)
			) {
				return;
			}

			onToggle();
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formData);
		onToggle();
	};

	const handleReset = () => {
		onReset();
		setFormData(defaultArticleState);
	};

	const updateField = useCallback(
		<K extends keyof ArticleStateType>(
			field: K,
			value: ArticleStateType[K]
		) => {
			setFormData((prev) => ({ ...prev, [field]: value }));
		},
		[]
	);

	return (
		<>
			<ArrowButton ref={arrowButtonRef} isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formData.fontFamilyOption}
						onChange={(option: OptionType) =>
							updateField('fontFamilyOption', option)
						}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formData.fontSizeOption}
						name='radio'
						onChange={(option: OptionType) =>
							updateField('fontSizeOption', option)
						}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formData.fontColor}
						onChange={(option: OptionType) => updateField('fontColor', option)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formData.backgroundColor}
						onChange={(option: OptionType) =>
							updateField('backgroundColor', option)
						}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formData.contentWidth}
						onChange={(option: OptionType) =>
							updateField('contentWidth', option)
						}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
