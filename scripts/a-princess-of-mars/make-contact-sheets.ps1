Add-Type -AssemblyName System.Drawing
$root = Resolve-Path (Join-Path $PSScriptRoot '..\..\library\a-princess-of-mars')
$out = Join-Path $PSScriptRoot 'qa'
New-Item -ItemType Directory -Force $out | Out-Null
function New-Sheet($name, $files, $columns) {
  $cellWidth=320; $cellHeight=250; $rows=[Math]::Ceiling($files.Count/$columns)
  $sheet=[Drawing.Bitmap]::new($cellWidth*$columns,$cellHeight*$rows)
  $g=[Drawing.Graphics]::FromImage($sheet);$g.Clear([Drawing.Color]::FromArgb(32,28,25))
  $font=[Drawing.Font]::new('Arial',12);$brush=[Drawing.SolidBrush]::new([Drawing.Color]::White)
  for($i=0;$i -lt $files.Count;$i++){$file=$files[$i];$x=($i%$columns)*$cellWidth;$y=[Math]::Floor($i/$columns)*$cellHeight;$img=[Drawing.Image]::FromFile($file.FullName);$ratio=[Math]::Min(300/$img.Width,210/$img.Height);$w=[int]($img.Width*$ratio);$h=[int]($img.Height*$ratio);$g.DrawImage($img,$x+(320-$w)/2,$y+5,$w,$h);$g.DrawString($file.BaseName,$font,$brush,$x+8,$y+220);$img.Dispose()}
  $target=Join-Path $out "$name.png";$sheet.Save($target,[Drawing.Imaging.ImageFormat]::Png);$brush.Dispose();$font.Dispose();$g.Dispose();$sheet.Dispose()
}
New-Sheet 'characters' @(Get-ChildItem (Join-Path $root 'art\characters') -Filter *.png | Sort-Object Name) 4
New-Sheet 'items' @(Get-ChildItem (Join-Path $root 'art\items') -Filter *.png | Sort-Object Name) 4
New-Sheet 'locations-1' @(Get-ChildItem (Join-Path $root 'art\locations') -Filter *.png | Sort-Object Name | Select-Object -First 15) 3
New-Sheet 'locations-2' @(Get-ChildItem (Join-Path $root 'art\locations') -Filter *.png | Sort-Object Name | Select-Object -Skip 15) 3
New-Sheet 'maps-world' @((Get-ChildItem (Join-Path $root 'maps') -Filter *.png | Sort-Object Name) + (Get-Item (Join-Path $root 'art\world.png'))) 3
