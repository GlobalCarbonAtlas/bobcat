function toggle_visibility()
						{
							for (i=1; i<=6; i++) {
								$("#toogleVisibilityButton"+i).click(function() {
									$("#subContainerInfo"+i).hide();
								});
							}
						}