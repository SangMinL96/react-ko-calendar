const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

gulp.task('spr', () => {
	const { argv } = yargs(hideBin(process.argv));

	const { name } = argv;

	if (!name) throw new Error('컴파일할 [이미지 폴더명]이 입력되지 않았습니다. :: ex) yarn spr --name [이미지 폴더명]');

	const root = path.resolve(__dirname, '.');

	const source = gulp.src(`${root}/src/assets/spr/${name}/*.png`).pipe(
		spritesmith({
			imgName: `spr_${name}.png`,
			cssName: `spr.${name}.scss`,
			imgPath: `/src/assets/images/spr/spr_${name}.png?${Date.now()}`,
			padding: 2,
			cssFormat: 'scss',
		}),
	);

	const imgSource = source.img.pipe(gulp.dest(`${root}/src/assets/images/spr`));
	const cssSource = source.css.pipe(gulp.dest(`${root}/src/assets/scss/spr`));

	return merge(imgSource, cssSource);
});

gulp.task('spr-module', () => {
	const { argv } = yargs(hideBin(process.argv)).option('ver', {
		default:'v2',
		describe:'module version, default:v2'
	}).option('name', {
		default:'icon'
	});

	const { ver, name } = argv;

	if (!name) throw new Error('컴파일할 [이미지 폴더명]이 입력되지 않았습니다. :: ex) yarn spr:module --name [이미지 폴더명]');

	const root = path.resolve(__dirname, '.');

	const source = gulp.src(`${root}/src/assets/spr/module/${ver}/${name}/*.png`).pipe(
		spritesmith({
			imgName: `spr_module_${ver}_${name}.png`,
			cssName: `spr.module_${ver}_${name}.scss`,
			imgPath: `/src/assets/images/spr/spr_module_${ver}_${name}.png?${Date.now()}`,
			padding: 2,
			cssFormat: 'scss',
		}),
	);

	const imgSource = source.img.pipe(gulp.dest(`${root}/src/assets/images/spr`));
	const cssSource = source.css.pipe(gulp.dest(`${root}/src/assets/scss/spr`));

	return merge(imgSource, cssSource);
});
