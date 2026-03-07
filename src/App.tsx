import { CSSProperties, useState, useCallback } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyChanges = useCallback((newState: ArticleStateType) => {
		setArticleState(newState);
	}, []);

	const handleResetChanges = useCallback(() => {
		setArticleState(defaultArticleState);
	}, []);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={articleState}
				onApply={handleApplyChanges}
				onReset={handleResetChanges}
			/>
			<Article />
		</main>
	);
};
