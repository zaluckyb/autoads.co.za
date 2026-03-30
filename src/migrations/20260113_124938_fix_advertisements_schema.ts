import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_icons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_column_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_links_alignment" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_image_size" AS ENUM('xs', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_image_aspect" AS ENUM('auto', '16:9', '4:3', '1:1', '9:16', '2:3');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_image_height" AS ENUM('auto', '100', '150', '200', '300');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_icon_size" AS ENUM('xs', 'sm', 'md', 'lg', '150');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_text_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_pages_blocks_content_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_icons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_column_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_links_alignment" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_image_size" AS ENUM('xs', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_image_aspect" AS ENUM('auto', '16:9', '4:3', '1:1', '9:16', '2:3');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_image_height" AS ENUM('auto', '100', '150', '200', '300');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_icon_size" AS ENUM('xs', 'sm', 'md', 'lg', '150');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_text_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum__pages_v_blocks_content_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'author', 'contributor', 'subscriber', 'user');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_icons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_column_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_links_alignment" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_image_size" AS ENUM('xs', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_image_aspect" AS ENUM('auto', '16:9', '4:3', '1:1', '9:16', '2:3');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_image_height" AS ENUM('auto', '100', '150', '200', '300');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_icon_size" AS ENUM('xs', 'sm', 'md', 'lg', '150');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_text_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_magazines_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_magazines_blocks_content_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_magazines_blocks_content_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_magazines_blocks_content_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_magazines_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_magazines_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_magazines_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_magazines_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_icons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_column_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_links_alignment" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_image_size" AS ENUM('xs', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_image_aspect" AS ENUM('auto', '16:9', '4:3', '1:1', '9:16', '2:3');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_image_height" AS ENUM('auto', '100', '150', '200', '300');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_icon_size" AS ENUM('xs', 'sm', 'md', 'lg', '150');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_text_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum__magazines_v_blocks_content_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__magazines_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__magazines_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__magazines_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__magazines_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_advertisements_location" AS ENUM('postSidebar');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_sub_nav_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_icons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_column_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_links_alignment" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_image_size" AS ENUM('xs', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_image_aspect" AS ENUM('auto', '16:9', '4:3', '1:1', '9:16', '2:3');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_image_height" AS ENUM('auto', '100', '150', '200', '300');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_icon_size" AS ENUM('xs', 'sm', 'md', 'lg', '150');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_text_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_blocks_content_spacing_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_spacing_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_spacing_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_spacing_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_footer_blocks_content_border_style" AS ENUM('none', 'full', 'top', 'bottom', 'left', 'right', 'leftRight');
  CREATE TYPE "public"."enum_footer_blocks_content_border_radius" AS ENUM('none', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_layout_position" AS ENUM('above', 'below');
  CREATE TABLE "pages_blocks_content_columns_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"link_type" "enum_pages_blocks_content_columns_icons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"show_padding_on_mobile" boolean DEFAULT true,
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_size" boolean,
  	"custom_size_percent" numeric,
  	"enable_column_border" boolean,
  	"column_border_radius" "enum_pages_blocks_content_columns_column_border_radius" DEFAULT 'md',
  	"alignment" "enum_pages_blocks_content_columns_alignment" DEFAULT 'left',
  	"links_alignment" "enum_pages_blocks_content_columns_links_alignment" DEFAULT 'inherit',
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"vertical_alignment" "enum_pages_blocks_content_columns_vertical_alignment" DEFAULT 'top',
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_pages_blocks_content_columns_spacing_top" DEFAULT 'none',
  	"spacing_bottom" "enum_pages_blocks_content_columns_spacing_bottom" DEFAULT 'none',
  	"spacing_left" "enum_pages_blocks_content_columns_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_pages_blocks_content_columns_spacing_right" DEFAULT 'md',
  	"show_right_padding_on_mobile" boolean DEFAULT true,
  	"border_style" "enum_pages_blocks_content_columns_border_style" DEFAULT 'none',
  	"border_radius" "enum_pages_blocks_content_columns_border_radius" DEFAULT 'md',
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"image_size" "enum_pages_blocks_content_columns_image_size" DEFAULT 'full',
  	"image_aspect" "enum_pages_blocks_content_columns_image_aspect" DEFAULT '16:9',
  	"image_height" "enum_pages_blocks_content_columns_image_height" DEFAULT 'auto',
  	"enable_image_shadow" boolean,
  	"enable_image_link" boolean,
  	"image_link_type" "enum_pages_blocks_content_columns_image_link_type" DEFAULT 'reference',
  	"image_link_new_tab" boolean,
  	"image_link_url" varchar,
  	"icon_size" "enum_pages_blocks_content_columns_icon_size" DEFAULT 'sm',
  	"rich_text" jsonb,
  	"text_position" "enum_pages_blocks_content_columns_text_position" DEFAULT 'below',
  	"remove_media_spacing" boolean DEFAULT false,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"enable_links" boolean,
  	"center_links" boolean,
  	"stack_links" boolean
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"items_per_row" numeric DEFAULT 3,
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_pages_blocks_content_spacing_top" DEFAULT 'md',
  	"spacing_bottom" "enum_pages_blocks_content_spacing_bottom" DEFAULT 'md',
  	"spacing_left" "enum_pages_blocks_content_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_pages_blocks_content_spacing_right" DEFAULT 'md',
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"border_style" "enum_pages_blocks_content_border_style" DEFAULT 'none',
  	"border_radius" "enum_pages_blocks_content_border_radius" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_min_height" varchar,
  	"hero_overlay_enabled" boolean DEFAULT true,
  	"hero_overlay_color" varchar,
  	"hero_overlay_opacity" numeric DEFAULT 70,
  	"hero_focal_left" numeric DEFAULT 50,
  	"hero_focal_top" numeric DEFAULT 50,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"link_type" "enum__pages_v_blocks_content_columns_icons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"show_padding_on_mobile" boolean DEFAULT true,
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_size" boolean,
  	"custom_size_percent" numeric,
  	"enable_column_border" boolean,
  	"column_border_radius" "enum__pages_v_blocks_content_columns_column_border_radius" DEFAULT 'md',
  	"alignment" "enum__pages_v_blocks_content_columns_alignment" DEFAULT 'left',
  	"links_alignment" "enum__pages_v_blocks_content_columns_links_alignment" DEFAULT 'inherit',
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"vertical_alignment" "enum__pages_v_blocks_content_columns_vertical_alignment" DEFAULT 'top',
  	"enable_muted_background" boolean,
  	"spacing_top" "enum__pages_v_blocks_content_columns_spacing_top" DEFAULT 'none',
  	"spacing_bottom" "enum__pages_v_blocks_content_columns_spacing_bottom" DEFAULT 'none',
  	"spacing_left" "enum__pages_v_blocks_content_columns_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum__pages_v_blocks_content_columns_spacing_right" DEFAULT 'md',
  	"show_right_padding_on_mobile" boolean DEFAULT true,
  	"border_style" "enum__pages_v_blocks_content_columns_border_style" DEFAULT 'none',
  	"border_radius" "enum__pages_v_blocks_content_columns_border_radius" DEFAULT 'md',
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"image_size" "enum__pages_v_blocks_content_columns_image_size" DEFAULT 'full',
  	"image_aspect" "enum__pages_v_blocks_content_columns_image_aspect" DEFAULT '16:9',
  	"image_height" "enum__pages_v_blocks_content_columns_image_height" DEFAULT 'auto',
  	"enable_image_shadow" boolean,
  	"enable_image_link" boolean,
  	"image_link_type" "enum__pages_v_blocks_content_columns_image_link_type" DEFAULT 'reference',
  	"image_link_new_tab" boolean,
  	"image_link_url" varchar,
  	"icon_size" "enum__pages_v_blocks_content_columns_icon_size" DEFAULT 'sm',
  	"rich_text" jsonb,
  	"text_position" "enum__pages_v_blocks_content_columns_text_position" DEFAULT 'below',
  	"remove_media_spacing" boolean DEFAULT false,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"enable_links" boolean,
  	"center_links" boolean,
  	"stack_links" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"items_per_row" numeric DEFAULT 3,
  	"enable_muted_background" boolean,
  	"spacing_top" "enum__pages_v_blocks_content_spacing_top" DEFAULT 'md',
  	"spacing_bottom" "enum__pages_v_blocks_content_spacing_bottom" DEFAULT 'md',
  	"spacing_left" "enum__pages_v_blocks_content_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum__pages_v_blocks_content_spacing_right" DEFAULT 'md',
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"border_style" "enum__pages_v_blocks_content_border_style" DEFAULT 'none',
  	"border_radius" "enum__pages_v_blocks_content_border_radius" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_min_height" varchar,
  	"version_hero_overlay_enabled" boolean DEFAULT true,
  	"version_hero_overlay_color" varchar,
  	"version_hero_overlay_opacity" numeric DEFAULT 70,
  	"version_hero_focal_left" numeric DEFAULT 50,
  	"version_hero_focal_top" numeric DEFAULT 50,
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts_block_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_id" varchar,
  	"block_type" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_block_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_id" varchar,
  	"block_type" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT false,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "magazines_blocks_content_columns_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"link_type" "enum_magazines_blocks_content_columns_icons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "magazines_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_magazines_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_magazines_blocks_content_columns_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "magazines_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_magazines_blocks_content_columns_size" DEFAULT 'oneThird',
  	"show_padding_on_mobile" boolean DEFAULT true,
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_size" boolean,
  	"custom_size_percent" numeric,
  	"enable_column_border" boolean,
  	"column_border_radius" "enum_magazines_blocks_content_columns_column_border_radius" DEFAULT 'md',
  	"alignment" "enum_magazines_blocks_content_columns_alignment" DEFAULT 'left',
  	"links_alignment" "enum_magazines_blocks_content_columns_links_alignment" DEFAULT 'inherit',
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"vertical_alignment" "enum_magazines_blocks_content_columns_vertical_alignment" DEFAULT 'top',
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_magazines_blocks_content_columns_spacing_top" DEFAULT 'none',
  	"spacing_bottom" "enum_magazines_blocks_content_columns_spacing_bottom" DEFAULT 'none',
  	"spacing_left" "enum_magazines_blocks_content_columns_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_magazines_blocks_content_columns_spacing_right" DEFAULT 'md',
  	"show_right_padding_on_mobile" boolean DEFAULT true,
  	"border_style" "enum_magazines_blocks_content_columns_border_style" DEFAULT 'none',
  	"border_radius" "enum_magazines_blocks_content_columns_border_radius" DEFAULT 'md',
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"image_size" "enum_magazines_blocks_content_columns_image_size" DEFAULT 'full',
  	"image_aspect" "enum_magazines_blocks_content_columns_image_aspect" DEFAULT '16:9',
  	"image_height" "enum_magazines_blocks_content_columns_image_height" DEFAULT 'auto',
  	"enable_image_shadow" boolean,
  	"enable_image_link" boolean,
  	"image_link_type" "enum_magazines_blocks_content_columns_image_link_type" DEFAULT 'reference',
  	"image_link_new_tab" boolean,
  	"image_link_url" varchar,
  	"icon_size" "enum_magazines_blocks_content_columns_icon_size" DEFAULT 'sm',
  	"rich_text" jsonb,
  	"text_position" "enum_magazines_blocks_content_columns_text_position" DEFAULT 'below',
  	"remove_media_spacing" boolean DEFAULT false,
  	"enable_link" boolean,
  	"link_type" "enum_magazines_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_magazines_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"enable_links" boolean,
  	"center_links" boolean,
  	"stack_links" boolean
  );
  
  CREATE TABLE "magazines_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"items_per_row" numeric DEFAULT 3,
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_magazines_blocks_content_spacing_top" DEFAULT 'md',
  	"spacing_bottom" "enum_magazines_blocks_content_spacing_bottom" DEFAULT 'md',
  	"spacing_left" "enum_magazines_blocks_content_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_magazines_blocks_content_spacing_right" DEFAULT 'md',
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"border_style" "enum_magazines_blocks_content_border_style" DEFAULT 'none',
  	"border_radius" "enum_magazines_blocks_content_border_radius" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "magazines_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_magazines_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_magazines_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "magazines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_magazines_hero_type" DEFAULT 'lowImpact',
  	"hero_min_height" varchar,
  	"hero_overlay_enabled" boolean DEFAULT true,
  	"hero_overlay_color" varchar,
  	"hero_overlay_opacity" numeric DEFAULT 70,
  	"hero_focal_left" numeric DEFAULT 50,
  	"hero_focal_top" numeric DEFAULT 50,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_magazines_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "magazines_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_magazines_v_blocks_content_columns_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"link_type" "enum__magazines_v_blocks_content_columns_icons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_magazines_v_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__magazines_v_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__magazines_v_blocks_content_columns_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_magazines_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__magazines_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"show_padding_on_mobile" boolean DEFAULT true,
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_size" boolean,
  	"custom_size_percent" numeric,
  	"enable_column_border" boolean,
  	"column_border_radius" "enum__magazines_v_blocks_content_columns_column_border_radius" DEFAULT 'md',
  	"alignment" "enum__magazines_v_blocks_content_columns_alignment" DEFAULT 'left',
  	"links_alignment" "enum__magazines_v_blocks_content_columns_links_alignment" DEFAULT 'inherit',
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"vertical_alignment" "enum__magazines_v_blocks_content_columns_vertical_alignment" DEFAULT 'top',
  	"enable_muted_background" boolean,
  	"spacing_top" "enum__magazines_v_blocks_content_columns_spacing_top" DEFAULT 'none',
  	"spacing_bottom" "enum__magazines_v_blocks_content_columns_spacing_bottom" DEFAULT 'none',
  	"spacing_left" "enum__magazines_v_blocks_content_columns_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum__magazines_v_blocks_content_columns_spacing_right" DEFAULT 'md',
  	"show_right_padding_on_mobile" boolean DEFAULT true,
  	"border_style" "enum__magazines_v_blocks_content_columns_border_style" DEFAULT 'none',
  	"border_radius" "enum__magazines_v_blocks_content_columns_border_radius" DEFAULT 'md',
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"image_size" "enum__magazines_v_blocks_content_columns_image_size" DEFAULT 'full',
  	"image_aspect" "enum__magazines_v_blocks_content_columns_image_aspect" DEFAULT '16:9',
  	"image_height" "enum__magazines_v_blocks_content_columns_image_height" DEFAULT 'auto',
  	"enable_image_shadow" boolean,
  	"enable_image_link" boolean,
  	"image_link_type" "enum__magazines_v_blocks_content_columns_image_link_type" DEFAULT 'reference',
  	"image_link_new_tab" boolean,
  	"image_link_url" varchar,
  	"icon_size" "enum__magazines_v_blocks_content_columns_icon_size" DEFAULT 'sm',
  	"rich_text" jsonb,
  	"text_position" "enum__magazines_v_blocks_content_columns_text_position" DEFAULT 'below',
  	"remove_media_spacing" boolean DEFAULT false,
  	"enable_link" boolean,
  	"link_type" "enum__magazines_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__magazines_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"enable_links" boolean,
  	"center_links" boolean,
  	"stack_links" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_magazines_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"items_per_row" numeric DEFAULT 3,
  	"enable_muted_background" boolean,
  	"spacing_top" "enum__magazines_v_blocks_content_spacing_top" DEFAULT 'md',
  	"spacing_bottom" "enum__magazines_v_blocks_content_spacing_bottom" DEFAULT 'md',
  	"spacing_left" "enum__magazines_v_blocks_content_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum__magazines_v_blocks_content_spacing_right" DEFAULT 'md',
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"border_style" "enum__magazines_v_blocks_content_border_style" DEFAULT 'none',
  	"border_radius" "enum__magazines_v_blocks_content_border_radius" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_magazines_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__magazines_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__magazines_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_magazines_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__magazines_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_min_height" varchar,
  	"version_hero_overlay_enabled" boolean DEFAULT true,
  	"version_hero_overlay_color" varchar,
  	"version_hero_overlay_opacity" numeric DEFAULT 70,
  	"version_hero_focal_left" numeric DEFAULT 50,
  	"version_hero_focal_top" numeric DEFAULT 50,
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__magazines_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_magazines_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "advertisements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"active" boolean DEFAULT true,
  	"location" "enum_advertisements_location" DEFAULT 'postSidebar' NOT NULL,
  	"placement_id" varchar NOT NULL,
  	"script_url" varchar DEFAULT 'https://ads.autoads.co.za/ad-script.js' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"magazines_id" integer,
  	"advertisements_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_nav_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_blocks_content_columns_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"link_type" "enum_footer_blocks_content_columns_icons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_footer_blocks_content_columns_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "footer_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_footer_blocks_content_columns_size" DEFAULT 'oneThird',
  	"show_padding_on_mobile" boolean DEFAULT true,
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_size" boolean,
  	"custom_size_percent" numeric,
  	"enable_column_border" boolean,
  	"column_border_radius" "enum_footer_blocks_content_columns_column_border_radius" DEFAULT 'md',
  	"alignment" "enum_footer_blocks_content_columns_alignment" DEFAULT 'left',
  	"links_alignment" "enum_footer_blocks_content_columns_links_alignment" DEFAULT 'inherit',
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"vertical_alignment" "enum_footer_blocks_content_columns_vertical_alignment" DEFAULT 'top',
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_footer_blocks_content_columns_spacing_top" DEFAULT 'none',
  	"spacing_bottom" "enum_footer_blocks_content_columns_spacing_bottom" DEFAULT 'none',
  	"spacing_left" "enum_footer_blocks_content_columns_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_footer_blocks_content_columns_spacing_right" DEFAULT 'md',
  	"show_right_padding_on_mobile" boolean DEFAULT true,
  	"border_style" "enum_footer_blocks_content_columns_border_style" DEFAULT 'none',
  	"border_radius" "enum_footer_blocks_content_columns_border_radius" DEFAULT 'md',
  	"media_id" integer,
  	"media_light_id" integer,
  	"media_dark_id" integer,
  	"image_size" "enum_footer_blocks_content_columns_image_size" DEFAULT 'full',
  	"image_aspect" "enum_footer_blocks_content_columns_image_aspect" DEFAULT '16:9',
  	"image_height" "enum_footer_blocks_content_columns_image_height" DEFAULT 'auto',
  	"enable_image_shadow" boolean,
  	"enable_image_link" boolean,
  	"image_link_type" "enum_footer_blocks_content_columns_image_link_type" DEFAULT 'reference',
  	"image_link_new_tab" boolean,
  	"image_link_url" varchar,
  	"icon_size" "enum_footer_blocks_content_columns_icon_size" DEFAULT 'sm',
  	"rich_text" jsonb,
  	"text_position" "enum_footer_blocks_content_columns_text_position" DEFAULT 'below',
  	"remove_media_spacing" boolean DEFAULT false,
  	"enable_link" boolean,
  	"link_type" "enum_footer_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_footer_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"enable_links" boolean,
  	"center_links" boolean,
  	"stack_links" boolean
  );
  
  CREATE TABLE "footer_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"items_per_row" numeric DEFAULT 3,
  	"enable_muted_background" boolean,
  	"spacing_top" "enum_footer_blocks_content_spacing_top" DEFAULT 'md',
  	"spacing_bottom" "enum_footer_blocks_content_spacing_bottom" DEFAULT 'md',
  	"spacing_left" "enum_footer_blocks_content_spacing_left" DEFAULT 'md',
  	"spacing_right" "enum_footer_blocks_content_spacing_right" DEFAULT 'md',
  	"show_margins_on_mobile" boolean DEFAULT true,
  	"enable_custom_margin" boolean,
  	"margin_top" numeric,
  	"margin_right" numeric,
  	"margin_bottom" numeric,
  	"margin_left" numeric,
  	"border_style" "enum_footer_blocks_content_border_style" DEFAULT 'none',
  	"border_radius" "enum_footer_blocks_content_border_radius" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout_position" "enum_footer_layout_position" DEFAULT 'above',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"google_analytics_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_content_columns_icons" ADD CONSTRAINT "pages_blocks_content_columns_icons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_icons" ADD CONSTRAINT "pages_blocks_content_columns_icons_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_icons" ADD CONSTRAINT "pages_blocks_content_columns_icons_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_icons" ADD CONSTRAINT "pages_blocks_content_columns_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_links" ADD CONSTRAINT "pages_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_icons" ADD CONSTRAINT "_pages_v_blocks_content_columns_icons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_icons" ADD CONSTRAINT "_pages_v_blocks_content_columns_icons_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_icons" ADD CONSTRAINT "_pages_v_blocks_content_columns_icons_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_icons" ADD CONSTRAINT "_pages_v_blocks_content_columns_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_links" ADD CONSTRAINT "_pages_v_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_block_references" ADD CONSTRAINT "posts_block_references_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_block_references" ADD CONSTRAINT "posts_block_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_block_references" ADD CONSTRAINT "_posts_v_version_block_references_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_block_references" ADD CONSTRAINT "_posts_v_version_block_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns_icons" ADD CONSTRAINT "magazines_blocks_content_columns_icons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns_icons" ADD CONSTRAINT "magazines_blocks_content_columns_icons_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns_icons" ADD CONSTRAINT "magazines_blocks_content_columns_icons_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns_icons" ADD CONSTRAINT "magazines_blocks_content_columns_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazines_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns_links" ADD CONSTRAINT "magazines_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazines_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns" ADD CONSTRAINT "magazines_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns" ADD CONSTRAINT "magazines_blocks_content_columns_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns" ADD CONSTRAINT "magazines_blocks_content_columns_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content_columns" ADD CONSTRAINT "magazines_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazines_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_blocks_content" ADD CONSTRAINT "magazines_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_hero_links" ADD CONSTRAINT "magazines_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines" ADD CONSTRAINT "magazines_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines" ADD CONSTRAINT "magazines_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazines_rels" ADD CONSTRAINT "magazines_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."magazines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_rels" ADD CONSTRAINT "magazines_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazines_rels" ADD CONSTRAINT "magazines_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns_icons" ADD CONSTRAINT "_magazines_v_blocks_content_columns_icons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns_icons" ADD CONSTRAINT "_magazines_v_blocks_content_columns_icons_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns_icons" ADD CONSTRAINT "_magazines_v_blocks_content_columns_icons_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns_icons" ADD CONSTRAINT "_magazines_v_blocks_content_columns_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazines_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns_links" ADD CONSTRAINT "_magazines_v_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazines_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns" ADD CONSTRAINT "_magazines_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns" ADD CONSTRAINT "_magazines_v_blocks_content_columns_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns" ADD CONSTRAINT "_magazines_v_blocks_content_columns_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content_columns" ADD CONSTRAINT "_magazines_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazines_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_blocks_content" ADD CONSTRAINT "_magazines_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazines_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_version_hero_links" ADD CONSTRAINT "_magazines_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazines_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v" ADD CONSTRAINT "_magazines_v_parent_id_magazines_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."magazines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v" ADD CONSTRAINT "_magazines_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v" ADD CONSTRAINT "_magazines_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazines_v_rels" ADD CONSTRAINT "_magazines_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_magazines_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_rels" ADD CONSTRAINT "_magazines_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazines_v_rels" ADD CONSTRAINT "_magazines_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_magazines_fk" FOREIGN KEY ("magazines_id") REFERENCES "public"."magazines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_advertisements_fk" FOREIGN KEY ("advertisements_id") REFERENCES "public"."advertisements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_nav" ADD CONSTRAINT "header_nav_items_sub_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns_icons" ADD CONSTRAINT "footer_blocks_content_columns_icons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns_icons" ADD CONSTRAINT "footer_blocks_content_columns_icons_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns_icons" ADD CONSTRAINT "footer_blocks_content_columns_icons_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns_icons" ADD CONSTRAINT "footer_blocks_content_columns_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns_links" ADD CONSTRAINT "footer_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns" ADD CONSTRAINT "footer_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns" ADD CONSTRAINT "footer_blocks_content_columns_media_light_id_media_id_fk" FOREIGN KEY ("media_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns" ADD CONSTRAINT "footer_blocks_content_columns_media_dark_id_media_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_content_columns" ADD CONSTRAINT "footer_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_content" ADD CONSTRAINT "footer_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_media_block" ADD CONSTRAINT "footer_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_media_block" ADD CONSTRAINT "footer_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_icons_order_idx" ON "pages_blocks_content_columns_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_icons_parent_id_idx" ON "pages_blocks_content_columns_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_icons_media_idx" ON "pages_blocks_content_columns_icons" USING btree ("media_id");
  CREATE INDEX "pages_blocks_content_columns_icons_media_light_idx" ON "pages_blocks_content_columns_icons" USING btree ("media_light_id");
  CREATE INDEX "pages_blocks_content_columns_icons_media_dark_idx" ON "pages_blocks_content_columns_icons" USING btree ("media_dark_id");
  CREATE INDEX "pages_blocks_content_columns_links_order_idx" ON "pages_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_links_parent_id_idx" ON "pages_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_media_idx" ON "pages_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "pages_blocks_content_columns_media_light_idx" ON "pages_blocks_content_columns" USING btree ("media_light_id");
  CREATE INDEX "pages_blocks_content_columns_media_dark_idx" ON "pages_blocks_content_columns" USING btree ("media_dark_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_blocks_content_columns_icons_order_idx" ON "_pages_v_blocks_content_columns_icons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_icons_parent_id_idx" ON "_pages_v_blocks_content_columns_icons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_icons_media_idx" ON "_pages_v_blocks_content_columns_icons" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_columns_icons_media_light_idx" ON "_pages_v_blocks_content_columns_icons" USING btree ("media_light_id");
  CREATE INDEX "_pages_v_blocks_content_columns_icons_media_dark_idx" ON "_pages_v_blocks_content_columns_icons" USING btree ("media_dark_id");
  CREATE INDEX "_pages_v_blocks_content_columns_links_order_idx" ON "_pages_v_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_links_parent_id_idx" ON "_pages_v_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_light_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_light_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_dark_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_dark_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_block_references_order_idx" ON "posts_block_references" USING btree ("_order");
  CREATE INDEX "posts_block_references_parent_id_idx" ON "posts_block_references" USING btree ("_parent_id");
  CREATE INDEX "posts_block_references_media_idx" ON "posts_block_references" USING btree ("media_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_block_references_order_idx" ON "_posts_v_version_block_references" USING btree ("_order");
  CREATE INDEX "_posts_v_version_block_references_parent_id_idx" ON "_posts_v_version_block_references" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_block_references_media_idx" ON "_posts_v_version_block_references" USING btree ("media_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "magazines_blocks_content_columns_icons_order_idx" ON "magazines_blocks_content_columns_icons" USING btree ("_order");
  CREATE INDEX "magazines_blocks_content_columns_icons_parent_id_idx" ON "magazines_blocks_content_columns_icons" USING btree ("_parent_id");
  CREATE INDEX "magazines_blocks_content_columns_icons_media_idx" ON "magazines_blocks_content_columns_icons" USING btree ("media_id");
  CREATE INDEX "magazines_blocks_content_columns_icons_media_light_idx" ON "magazines_blocks_content_columns_icons" USING btree ("media_light_id");
  CREATE INDEX "magazines_blocks_content_columns_icons_media_dark_idx" ON "magazines_blocks_content_columns_icons" USING btree ("media_dark_id");
  CREATE INDEX "magazines_blocks_content_columns_links_order_idx" ON "magazines_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "magazines_blocks_content_columns_links_parent_id_idx" ON "magazines_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE INDEX "magazines_blocks_content_columns_order_idx" ON "magazines_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "magazines_blocks_content_columns_parent_id_idx" ON "magazines_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "magazines_blocks_content_columns_media_idx" ON "magazines_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "magazines_blocks_content_columns_media_light_idx" ON "magazines_blocks_content_columns" USING btree ("media_light_id");
  CREATE INDEX "magazines_blocks_content_columns_media_dark_idx" ON "magazines_blocks_content_columns" USING btree ("media_dark_id");
  CREATE INDEX "magazines_blocks_content_order_idx" ON "magazines_blocks_content" USING btree ("_order");
  CREATE INDEX "magazines_blocks_content_parent_id_idx" ON "magazines_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "magazines_blocks_content_path_idx" ON "magazines_blocks_content" USING btree ("_path");
  CREATE INDEX "magazines_hero_links_order_idx" ON "magazines_hero_links" USING btree ("_order");
  CREATE INDEX "magazines_hero_links_parent_id_idx" ON "magazines_hero_links" USING btree ("_parent_id");
  CREATE INDEX "magazines_hero_hero_media_idx" ON "magazines" USING btree ("hero_media_id");
  CREATE INDEX "magazines_meta_meta_image_idx" ON "magazines" USING btree ("meta_image_id");
  CREATE INDEX "magazines_slug_idx" ON "magazines" USING btree ("slug");
  CREATE INDEX "magazines_updated_at_idx" ON "magazines" USING btree ("updated_at");
  CREATE INDEX "magazines_created_at_idx" ON "magazines" USING btree ("created_at");
  CREATE INDEX "magazines__status_idx" ON "magazines" USING btree ("_status");
  CREATE INDEX "magazines_rels_order_idx" ON "magazines_rels" USING btree ("order");
  CREATE INDEX "magazines_rels_parent_idx" ON "magazines_rels" USING btree ("parent_id");
  CREATE INDEX "magazines_rels_path_idx" ON "magazines_rels" USING btree ("path");
  CREATE INDEX "magazines_rels_pages_id_idx" ON "magazines_rels" USING btree ("pages_id");
  CREATE INDEX "magazines_rels_posts_id_idx" ON "magazines_rels" USING btree ("posts_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_icons_order_idx" ON "_magazines_v_blocks_content_columns_icons" USING btree ("_order");
  CREATE INDEX "_magazines_v_blocks_content_columns_icons_parent_id_idx" ON "_magazines_v_blocks_content_columns_icons" USING btree ("_parent_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_icons_media_idx" ON "_magazines_v_blocks_content_columns_icons" USING btree ("media_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_icons_media_light_idx" ON "_magazines_v_blocks_content_columns_icons" USING btree ("media_light_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_icons_media_dark_idx" ON "_magazines_v_blocks_content_columns_icons" USING btree ("media_dark_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_links_order_idx" ON "_magazines_v_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "_magazines_v_blocks_content_columns_links_parent_id_idx" ON "_magazines_v_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_order_idx" ON "_magazines_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_magazines_v_blocks_content_columns_parent_id_idx" ON "_magazines_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_media_idx" ON "_magazines_v_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_media_light_idx" ON "_magazines_v_blocks_content_columns" USING btree ("media_light_id");
  CREATE INDEX "_magazines_v_blocks_content_columns_media_dark_idx" ON "_magazines_v_blocks_content_columns" USING btree ("media_dark_id");
  CREATE INDEX "_magazines_v_blocks_content_order_idx" ON "_magazines_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_magazines_v_blocks_content_parent_id_idx" ON "_magazines_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_magazines_v_blocks_content_path_idx" ON "_magazines_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_magazines_v_version_hero_links_order_idx" ON "_magazines_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_magazines_v_version_hero_links_parent_id_idx" ON "_magazines_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_magazines_v_parent_idx" ON "_magazines_v" USING btree ("parent_id");
  CREATE INDEX "_magazines_v_version_hero_version_hero_media_idx" ON "_magazines_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_magazines_v_version_meta_version_meta_image_idx" ON "_magazines_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_magazines_v_version_version_slug_idx" ON "_magazines_v" USING btree ("version_slug");
  CREATE INDEX "_magazines_v_version_version_updated_at_idx" ON "_magazines_v" USING btree ("version_updated_at");
  CREATE INDEX "_magazines_v_version_version_created_at_idx" ON "_magazines_v" USING btree ("version_created_at");
  CREATE INDEX "_magazines_v_version_version__status_idx" ON "_magazines_v" USING btree ("version__status");
  CREATE INDEX "_magazines_v_created_at_idx" ON "_magazines_v" USING btree ("created_at");
  CREATE INDEX "_magazines_v_updated_at_idx" ON "_magazines_v" USING btree ("updated_at");
  CREATE INDEX "_magazines_v_latest_idx" ON "_magazines_v" USING btree ("latest");
  CREATE INDEX "_magazines_v_autosave_idx" ON "_magazines_v" USING btree ("autosave");
  CREATE INDEX "_magazines_v_rels_order_idx" ON "_magazines_v_rels" USING btree ("order");
  CREATE INDEX "_magazines_v_rels_parent_idx" ON "_magazines_v_rels" USING btree ("parent_id");
  CREATE INDEX "_magazines_v_rels_path_idx" ON "_magazines_v_rels" USING btree ("path");
  CREATE INDEX "_magazines_v_rels_pages_id_idx" ON "_magazines_v_rels" USING btree ("pages_id");
  CREATE INDEX "_magazines_v_rels_posts_id_idx" ON "_magazines_v_rels" USING btree ("posts_id");
  CREATE INDEX "advertisements_updated_at_idx" ON "advertisements" USING btree ("updated_at");
  CREATE INDEX "advertisements_created_at_idx" ON "advertisements" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_magazines_id_idx" ON "payload_locked_documents_rels" USING btree ("magazines_id");
  CREATE INDEX "payload_locked_documents_rels_advertisements_id_idx" ON "payload_locked_documents_rels" USING btree ("advertisements_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_nav_order_idx" ON "header_nav_items_sub_nav" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_nav_parent_id_idx" ON "header_nav_items_sub_nav" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_blocks_content_columns_icons_order_idx" ON "footer_blocks_content_columns_icons" USING btree ("_order");
  CREATE INDEX "footer_blocks_content_columns_icons_parent_id_idx" ON "footer_blocks_content_columns_icons" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_content_columns_icons_media_idx" ON "footer_blocks_content_columns_icons" USING btree ("media_id");
  CREATE INDEX "footer_blocks_content_columns_icons_media_light_idx" ON "footer_blocks_content_columns_icons" USING btree ("media_light_id");
  CREATE INDEX "footer_blocks_content_columns_icons_media_dark_idx" ON "footer_blocks_content_columns_icons" USING btree ("media_dark_id");
  CREATE INDEX "footer_blocks_content_columns_links_order_idx" ON "footer_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_content_columns_links_parent_id_idx" ON "footer_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_content_columns_order_idx" ON "footer_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "footer_blocks_content_columns_parent_id_idx" ON "footer_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_content_columns_media_idx" ON "footer_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "footer_blocks_content_columns_media_light_idx" ON "footer_blocks_content_columns" USING btree ("media_light_id");
  CREATE INDEX "footer_blocks_content_columns_media_dark_idx" ON "footer_blocks_content_columns" USING btree ("media_dark_id");
  CREATE INDEX "footer_blocks_content_order_idx" ON "footer_blocks_content" USING btree ("_order");
  CREATE INDEX "footer_blocks_content_parent_id_idx" ON "footer_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_content_path_idx" ON "footer_blocks_content" USING btree ("_path");
  CREATE INDEX "footer_blocks_media_block_order_idx" ON "footer_blocks_media_block" USING btree ("_order");
  CREATE INDEX "footer_blocks_media_block_parent_id_idx" ON "footer_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_media_block_path_idx" ON "footer_blocks_media_block" USING btree ("_path");
  CREATE INDEX "footer_blocks_media_block_media_idx" ON "footer_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_columns_icons" CASCADE;
  DROP TABLE "pages_blocks_content_columns_links" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_icons" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_links" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts_block_references" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v_version_block_references" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "magazines_blocks_content_columns_icons" CASCADE;
  DROP TABLE "magazines_blocks_content_columns_links" CASCADE;
  DROP TABLE "magazines_blocks_content_columns" CASCADE;
  DROP TABLE "magazines_blocks_content" CASCADE;
  DROP TABLE "magazines_hero_links" CASCADE;
  DROP TABLE "magazines" CASCADE;
  DROP TABLE "magazines_rels" CASCADE;
  DROP TABLE "_magazines_v_blocks_content_columns_icons" CASCADE;
  DROP TABLE "_magazines_v_blocks_content_columns_links" CASCADE;
  DROP TABLE "_magazines_v_blocks_content_columns" CASCADE;
  DROP TABLE "_magazines_v_blocks_content" CASCADE;
  DROP TABLE "_magazines_v_version_hero_links" CASCADE;
  DROP TABLE "_magazines_v" CASCADE;
  DROP TABLE "_magazines_v_rels" CASCADE;
  DROP TABLE "advertisements" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_nav" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_blocks_content_columns_icons" CASCADE;
  DROP TABLE "footer_blocks_content_columns_links" CASCADE;
  DROP TABLE "footer_blocks_content_columns" CASCADE;
  DROP TABLE "footer_blocks_content" CASCADE;
  DROP TABLE "footer_blocks_media_block" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_content_columns_icons_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_column_border_radius";
  DROP TYPE "public"."enum_pages_blocks_content_columns_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_columns_links_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_columns_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_columns_spacing_top";
  DROP TYPE "public"."enum_pages_blocks_content_columns_spacing_bottom";
  DROP TYPE "public"."enum_pages_blocks_content_columns_spacing_left";
  DROP TYPE "public"."enum_pages_blocks_content_columns_spacing_right";
  DROP TYPE "public"."enum_pages_blocks_content_columns_border_style";
  DROP TYPE "public"."enum_pages_blocks_content_columns_border_radius";
  DROP TYPE "public"."enum_pages_blocks_content_columns_image_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_image_aspect";
  DROP TYPE "public"."enum_pages_blocks_content_columns_image_height";
  DROP TYPE "public"."enum_pages_blocks_content_columns_image_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_icon_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_text_position";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_spacing_top";
  DROP TYPE "public"."enum_pages_blocks_content_spacing_bottom";
  DROP TYPE "public"."enum_pages_blocks_content_spacing_left";
  DROP TYPE "public"."enum_pages_blocks_content_spacing_right";
  DROP TYPE "public"."enum_pages_blocks_content_border_style";
  DROP TYPE "public"."enum_pages_blocks_content_border_radius";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_icons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_column_border_radius";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_links_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_spacing_top";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_spacing_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_spacing_left";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_spacing_right";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_border_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_border_radius";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_image_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_image_aspect";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_image_height";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_image_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_icon_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_text_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing_top";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing_left";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing_right";
  DROP TYPE "public"."enum__pages_v_blocks_content_border_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_border_radius";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_icons_link_type";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_size";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_column_border_radius";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_alignment";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_links_alignment";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_vertical_alignment";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_spacing_top";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_spacing_bottom";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_spacing_left";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_spacing_right";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_border_style";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_border_radius";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_image_size";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_image_aspect";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_image_height";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_image_link_type";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_icon_size";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_text_position";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_magazines_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_magazines_blocks_content_spacing_top";
  DROP TYPE "public"."enum_magazines_blocks_content_spacing_bottom";
  DROP TYPE "public"."enum_magazines_blocks_content_spacing_left";
  DROP TYPE "public"."enum_magazines_blocks_content_spacing_right";
  DROP TYPE "public"."enum_magazines_blocks_content_border_style";
  DROP TYPE "public"."enum_magazines_blocks_content_border_radius";
  DROP TYPE "public"."enum_magazines_hero_links_link_type";
  DROP TYPE "public"."enum_magazines_hero_links_link_appearance";
  DROP TYPE "public"."enum_magazines_hero_type";
  DROP TYPE "public"."enum_magazines_status";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_icons_link_type";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_column_border_radius";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_alignment";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_links_alignment";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_vertical_alignment";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_top";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_bottom";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_left";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_spacing_right";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_border_style";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_border_radius";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_image_size";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_image_aspect";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_image_height";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_image_link_type";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_icon_size";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_text_position";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__magazines_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__magazines_v_blocks_content_spacing_top";
  DROP TYPE "public"."enum__magazines_v_blocks_content_spacing_bottom";
  DROP TYPE "public"."enum__magazines_v_blocks_content_spacing_left";
  DROP TYPE "public"."enum__magazines_v_blocks_content_spacing_right";
  DROP TYPE "public"."enum__magazines_v_blocks_content_border_style";
  DROP TYPE "public"."enum__magazines_v_blocks_content_border_radius";
  DROP TYPE "public"."enum__magazines_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__magazines_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__magazines_v_version_hero_type";
  DROP TYPE "public"."enum__magazines_v_version_status";
  DROP TYPE "public"."enum_advertisements_location";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_sub_nav_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_blocks_content_columns_icons_link_type";
  DROP TYPE "public"."enum_footer_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum_footer_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum_footer_blocks_content_columns_size";
  DROP TYPE "public"."enum_footer_blocks_content_columns_column_border_radius";
  DROP TYPE "public"."enum_footer_blocks_content_columns_alignment";
  DROP TYPE "public"."enum_footer_blocks_content_columns_links_alignment";
  DROP TYPE "public"."enum_footer_blocks_content_columns_vertical_alignment";
  DROP TYPE "public"."enum_footer_blocks_content_columns_spacing_top";
  DROP TYPE "public"."enum_footer_blocks_content_columns_spacing_bottom";
  DROP TYPE "public"."enum_footer_blocks_content_columns_spacing_left";
  DROP TYPE "public"."enum_footer_blocks_content_columns_spacing_right";
  DROP TYPE "public"."enum_footer_blocks_content_columns_border_style";
  DROP TYPE "public"."enum_footer_blocks_content_columns_border_radius";
  DROP TYPE "public"."enum_footer_blocks_content_columns_image_size";
  DROP TYPE "public"."enum_footer_blocks_content_columns_image_aspect";
  DROP TYPE "public"."enum_footer_blocks_content_columns_image_height";
  DROP TYPE "public"."enum_footer_blocks_content_columns_image_link_type";
  DROP TYPE "public"."enum_footer_blocks_content_columns_icon_size";
  DROP TYPE "public"."enum_footer_blocks_content_columns_text_position";
  DROP TYPE "public"."enum_footer_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_footer_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_footer_blocks_content_spacing_top";
  DROP TYPE "public"."enum_footer_blocks_content_spacing_bottom";
  DROP TYPE "public"."enum_footer_blocks_content_spacing_left";
  DROP TYPE "public"."enum_footer_blocks_content_spacing_right";
  DROP TYPE "public"."enum_footer_blocks_content_border_style";
  DROP TYPE "public"."enum_footer_blocks_content_border_radius";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_layout_position";`)
}
